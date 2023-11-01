export class User{
    declare id: number;
    declare name: string;
    declare email: string;
    declare phoneNumber: string;
    declare info: string;
    declare tags: string[];
    declare createdAt: Date;
    declare lastSeen: Date;
    declare avatarImageId: number;
    declare isEmailPublic: boolean;
    declare isPhoneNumberPublic: boolean;
    declare acceptedTosDate: Date;
    declare roleId: number;
    declare departmentId: number;
    declare companyId: number;
}