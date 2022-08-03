import {MoneyType} from "./money-type";
import {User} from "./user";

export interface Wallet {
  id?: number;
  name?: string;
  icon?: string;
  totalMoney?: string;
  moneyType: MoneyType;
  user: User;
  status?: string;
}
