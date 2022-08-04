import {User} from "./user";

export interface Wallet {
  id: number;
  name: string;
  icon: string;
  amountMoney: number;
  status: number  ;
  moneyType: string;
  user: User;
}
