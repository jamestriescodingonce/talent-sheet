import { supabase } from "./supabase";

export type DealType =
  | "Capital Investment"
  | "Brand Ambassador/Equity"
  | "Executive Stake"
  | "Franchise Ownership";

export type Investment = {
  id: string;
  amount_invested: number | null;
  investment_date: string | null;
  deal_type: DealType | null;
  amount_precision: string | null;
  round_total_raised: number | null;
  post_money_valuation: number | null;
  source_url: string | null;
  verification: "Verified" | "Reported" | "Unverified" | null;
  round: { name: string } | null;
  talent: {
    id: string;
    name: string;
    sport: { name: string } | null;
    category: { name: string } | null;
  };
  company: {
    id: string;
    name: string;
    description: string | null;
    website_url: string | null;
    logo_url: string | null;
    favicon_url: string | null;
    industries: { industry: { name: string } }[];
  };
};

const INVESTMENT_SELECT = `
  id, amount_invested, investment_date, deal_type, amount_precision,
  round_total_raised, post_money_valuation, source_url, verification,
  round:rounds(name),
  talent:talent(id, name, sport:sports(name), category:categories(name)),
  company:companies(
    id, name, description, website_url, logo_url, favicon_url,
    industries:company_industries(industry:industries(name))
  )
`;

/** All investments, newest first, optionally filtered by deal type. */
export async function getInvestments(dealType?: DealType): Promise<Investment[]> {
  let query = supabase
    .from("investments")
    .select(INVESTMENT_SELECT)
    .order("investment_date", { ascending: false, nullsFirst: false });
  if (dealType) query = query.eq("deal_type", dealType);

  const { data, error } = await query;
  if (error) throw error;
  return data as unknown as Investment[];
}

/** One athlete's profile: the talent row plus all of their investments. */
export async function getTalentProfile(talentId: string) {
  const [talent, investments] = await Promise.all([
    supabase
      .from("talent")
      .select("id, name, sport:sports(name), category:categories(name)")
      .eq("id", talentId)
      .single(),
    supabase
      .from("investments")
      .select(INVESTMENT_SELECT)
      .eq("talent_id", talentId)
      .order("investment_date", { ascending: false, nullsFirst: false }),
  ]);
  if (talent.error) throw talent.error;
  if (investments.error) throw investments.error;
  return {
    talent: talent.data,
    investments: investments.data as unknown as Investment[],
  };
}
