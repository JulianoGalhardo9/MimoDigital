export interface CouponItem {
  id: string;
  title: string;
  description: string;
  isClaimed: boolean;
  claimedAt?: string;
}

export interface CouponBook {
  title: string;
  description: string;
  coupons: CouponItem[];
}