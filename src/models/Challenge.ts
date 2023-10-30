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
    declare createdAt: Date;
    declare endDate: Date;
    declare tags: string[];
    declare isPublicViewable: boolean;
    declare isPublicReactable: boolean;
}