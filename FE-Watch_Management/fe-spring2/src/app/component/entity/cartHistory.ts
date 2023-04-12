import {Usert} from './usert';

export interface CartHistory {
  id?: number;
  name?: string;
  createDate?: string;
  address?: string;
  flag?: boolean;
  phoneNumber?: string;
  email?: string;
  user?: Usert
}
