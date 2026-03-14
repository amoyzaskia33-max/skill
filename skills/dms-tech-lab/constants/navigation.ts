export const navLinks = [
  { name: "홈", href: "/" },
  { name: "리도이야기", href: "/about" },
  { name: "서비스", href: "/services" },
  { name: "교육자료", href: "/education" },
  { name: "블로그", href: "/blog" },
] as const;

export type NavLink = (typeof navLinks)[number];
