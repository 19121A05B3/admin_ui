export interface IUser {
  id: string;
  tags: any;
  produce: string;
  tvalue: any;
  quantity: any;
  sids: string;
  buyer: any;
  tinfo: any;
  addcost: any;
}

export interface ISellerTransaction {
  pk: string;
  gsi_status: any;
  produce: string;
  matched_quantity: string;
  gsi: string;
  buyer_id: any;
  event_latest: any;
  created_at: string;
  events: [];
  seller_final_price: string;
  buyer_location: string;
  seller_location:string;
  seller_id:string;
}

export interface IBuyerTransaction {
  pk: string;
  gsi_status: any;
  produce: string;
  buyer_final_price: string;
  matched_quantity: string;
  gsi: string;
  event_latest: any;
  created_at: string;
  events: [];
  seller_location: string;
  seller_id: string;
}
export interface IItsy {
  sk: string;
  category_name: string;
  crop_name: string;
  sub_category: string;
  grade: string;
  pk: string;
  quantity: string;
  created_timestamp: string;
  price_per_qnt: string;
  estimatedvalue: string;
  apmc_rate_data: { apmc_price: number; increase: number };
  crop_image_1: any;
  category: string;
  sub_type: string;
}
