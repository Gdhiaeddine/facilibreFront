
import { Product } from "./product";

export interface PurchaseRequest {
  id: string;
  product: Product;
  quantity: number;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  customerName: string;
  contactInfo: string;
  notes?: string;
  paymentType: 'immediate' | 'installment';
}
