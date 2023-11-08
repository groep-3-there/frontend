import { Company } from "./Company";
import { Department } from "./Department";
import { User } from "./User";
export class Challenge {
    declare id: number;
    declare author: User;
    declare department: Department;
    declare company: Company;
    declare contactInformation: string;
    declare title: string;
    declare description: string;
    declare bannerImageId: number | null;
    declare concludingRemarks: string;
    declare summary: string;
    declare status: string;
    declare createdAt: string;
    declare endDate: string;
    declare tags: string;
    declare visibility: string;
    declare imageAttachmentsIds : number[];
}

