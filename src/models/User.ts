import { Company } from "./Company";
import { Department } from "./Department";
import { Role } from "./Role";

export class User{
    declare id: number;
    declare name: string;
    declare info : string;
    declare tags: string;
    declare createdAt: string;
    declare lastSeen: string;
    declare avatarImageId : number;
    declare isEmailPublic: boolean;
    declare isPhoneNumberPublic: boolean;
    declare acceptedTosDate: string;
    declare email: string;
    declare phoneNumber: string;

    declare role : Role;
    declare department: Department;
    declare company: Company;
    


}