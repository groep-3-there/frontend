import { Company } from "./Company";
import { Department } from "./Department";
import { Permission } from "./Permission";

export class Role{
    id :number;
    name : string;
    createdAt : Date;
    isMatchmaker : boolean;
    company : Company;
    department : Department;
    permissions : Permission[]

    constructor(data : any){
        this.id = data.id;
        this.name = data.name;
        this.createdAt = new Date(data.createdAt);
        this.isMatchmaker = data.isMatchmaker;
        this.company = new Company(data.company);
        this.department = new Department(data.department);
        this.permissions = data.permissions.map((d : any) => new Permission(d));
    }
}