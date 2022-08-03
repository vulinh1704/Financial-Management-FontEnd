import {User} from "./user";
import {MoneyTypes} from "./money-types";

export interface Wallets {
  id?: string;
  name?: string;
  icon?: string;
  moneyAmount?: string;
  user: User;
  status?: number;
  moneyType: MoneyTypes;
}
