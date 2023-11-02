import { Company } from "./Company";
import { Department } from "./Department";
import { Permission } from "./Permission";

export class Role{
    declare id :number;
    declare name : string;
    declare createdAt : string;
    declare isMatchmaker : boolean;
    declare company : Company;
    declare department : Department;
    declare permissions : Permission[]
}