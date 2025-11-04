export interface Purchase {
  itemId: string;
  item: string;
  price: string;
}

export interface UserData {
  id: string;
  username: string;
  money: string;
  budgetPerWeek: string;
  purchases: Purchase[];
}
