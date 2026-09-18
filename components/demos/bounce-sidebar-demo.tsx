import { BounceSidebar } from "@/components/ui/bounce-sidebar"

const items = [
  { label: "General", heading: true },
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
]

export function Demo() {
  return <BounceSidebar items={items} dotColor="#FC4C01" />
}
