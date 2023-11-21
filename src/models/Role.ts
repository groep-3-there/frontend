import { Company } from "./Company";
import { Department } from "./Department";
import { Permission } from "./Permission";

export class Role {
    id: number;
    name: string;
    createdAt: Date;
    isMatchmaker: boolean;
    permissions: Permission[];
    isDeparmentAdmin: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = new Date(data.createdAt);
        this.isMatchmaker = data.isMatchmaker;
        this.permissions = data.permissions.map((d: any) => new Permission(d));
        this.isDeparmentAdmin = data.isDeparmentAdmin || false;
    }
}
