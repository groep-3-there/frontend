import { User } from "./User";

export class Challenge{
    declare id: number;
    declare authorId: number;
    declare departmentId: number;
    declare companyId: number;
    declare title: string;
    declare description: string;
    declare summary : string;
    declare contactInformation : string
    declare bannerId: number;
    declare concludingRemarks: string;
    declare status: string;
    declare createdAt: string;   
    declare endDate: string;
    declare tags: string[];
    declare isPublicViewable: boolean;
    declare isPublicReactable: boolean;
    declare author : User;

}