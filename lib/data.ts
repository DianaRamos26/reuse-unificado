// Dados mockados do ReUse — mesma modelagem do prisma/schema.prisma
// original (User, Category, Partner, Product), sem depender de banco
// de dados, para o app rodar 100% no front-end e ser fácil de hospedar.

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Partner = {
  id: string;
  name: string;
  commissionRate: number;
  verified: boolean;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: "NEW" | "USED_LIKE_NEW" | "USED_GOOD" | "USED_FAIR";
  distanceKm: number;
  imageUrl: string;
  isPartnerSale: boolean;
  categoryId: string;
  partnerId: string;
};

export type DemoUser = {
  name: string;
  email: string;
  password: string;
  points: number;
  level: number;
  levelLabel: string;
};

export const categories: Category[] = [
  { id: "cat-doacao", name: "Doação", slug: "doacao" },
  { id: "cat-venda", name: "Venda", slug: "venda" },
  { id: "cat-troca", name: "Troca", slug: "troca" },
  { id: "cat-todos", name: "Todos", slug: "todos" },
];

export const partner: Partner = {
  id: "partner-demo",
  name: "Parceiro ReUse",
  commissionRate: 0.1,
  verified: true,
};

export const products: Product[] = [
  {
    id: "cadeira",
    title: "Cadeira de madeira",
    description:
      "Cadeira de madeira maciça em ótimo estado. Bem conservada e resistente.",
    price: 30,
    condition: "USED_GOOD",
    distanceKm: 1.2,
    imageUrl: "/images/cadeira.jpg",
    isPartnerSale: true,
    categoryId: "cat-venda",
    partnerId: partner.id,
  },
  {
    id: "bicicleta",
    title: "Bicicleta aro 26",
    description: "Bicicleta aro 26 revisada, pronta para uso.",
    price: 150,
    condition: "USED_GOOD",
    distanceKm: 1.5,
    imageUrl: "/images/bicicleta.jpg",
    isPartnerSale: true,
    categoryId: "cat-venda",
    partnerId: partner.id,
  },
  {
    id: "planta",
    title: "Vaso de planta",
    description: "Vaso de planta ornamental, ideal para reflorestar sua casa.",
    price: 0,
    condition: "NEW",
    distanceKm: 0.9,
    imageUrl: "/images/planta.jpg",
    isPartnerSale: true,
    categoryId: "cat-doacao",
    partnerId: partner.id,
  },
];

export const demoUser: DemoUser = {
  name: "Ana",
  email: "ana@reuse.app",
  password: "reuse123",
  points: 2450,
  level: 3,
  levelLabel: "Guardiã do Planeta",
};

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const conditionLabel: Record<Product["condition"], string> = {
  NEW: "Novo",
  USED_LIKE_NEW: "Usado - Como novo",
  USED_GOOD: "Usado - Bom",
  USED_FAIR: "Usado - Regular",
};
