import {TrademarkT} from './trademarkT';
import {WatchType} from './watch-type';
import {Image} from './image';

export interface Watch {
  id?: number;
  name?: string;
  price?: number;
  origin?: string;
  face?: string;
  strapType?: string;
  flag?: boolean;
  note?: string;
  color?: string;
  trademarkT?:TrademarkT;
  watchType?:WatchType;
  images:Image[];
  quantity?:number;
}
