import {User} from "./user";

export interface Wallet {
  id: number;
  name: string;
  icon: string;
  amountMoney: number;
  status: string;
  moneyType: string;
  user: User;
}
