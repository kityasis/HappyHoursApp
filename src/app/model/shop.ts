import { Milestone } from "./milestone";
import { UserPermission } from "./user-permission";

//export class Shop {
 //   id: number;
 //   name: string;
 //   milestones: Milestone[];
 //   userPermissions: UserPermission[];
//}
export class Shop {
    id : number;
    name : string;
    type : boolean;    
    contactNumber : string;
    email : string;
    countryId : number;
    stateId : number;
    cityId : number;
    street : string;
    locality : string;      
    landmark : string;
    seatStrength : number;
    currencyCode : string;
    logo : string;
    shopImages : string;
    permission :string;
}