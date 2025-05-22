export interface Transaction {
  id: string;
  type: '入庫' | '出庫' | '移動';
  product_id: string;
  quantity: number;
  source_location_id: string | null;
  destination_location_id: string | null;
  timestamp: string;
  user_id: string;
  reference_number?: string;
}