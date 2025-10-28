import { number } from "zod";

export interface Product{
  id: string;
  name?: string;
  title?: string;
  price: number;
  description: string;
  features: string[];
  stock: number;
  image: string;
  category_id?: string;
  category: string;
  status : string;
  installmentPlans?: InstallmentPlan[];
}

export interface InstallmentPlan {
  months: number;
  monthlyPayment: number;
}
