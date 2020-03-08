import { Shop } from './shop';

export class Item {
    id : number;
    name : string;
    shopId : string;    
    price : number;
    qty : number;
    isHappyHour : boolean;
    shop: Shop;
}
    