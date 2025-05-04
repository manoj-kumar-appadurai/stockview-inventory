
export type StatusType = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface StockHistoryItem {
  action: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: StatusType;
  image?: string;
  description?: string;
  sku: string;
  stockHistory?: StockHistoryItem[];
}
