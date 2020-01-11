import { Milestone } from "./milestone";
import { UserPermission } from "./user-permission";

export class Shop {
    id: number;
    name: string;
    milestones: Milestone[];
    userPermissions: UserPermission[];
}