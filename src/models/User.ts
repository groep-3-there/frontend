import { Department } from "./Department";
import { Image } from "./Image";
import { Role } from "./Role";
import { Notification } from "./Notification";

export class User {
    id: number;
    name: string;
    info: string;
    tags: string;
    createdAt: Date;
    lastSeen: Date;
    avatarImageId: number | null;
    avatar: Image | null;
    isEmailPublic: boolean;
    isPhoneNumberPublic: boolean;
    acceptedTosDate: Date | null;
    email: string;
    phoneNumber: string;
    role: Role | null;
    department: Department | null;
    notifications: Notification[] | [];
    allowedEmailNotifications: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.info = data.info;
        this.tags = data.tags;
        this.createdAt = new Date(data.createdAt);
        this.lastSeen = new Date(data.lastSeen);
        this.avatarImageId = data.avatarImageId;
        this.avatar = data.avatarImageId
            ? new Image({ id: data.avatarImageId })
            : null;
        this.isEmailPublic = data.isEmailPublic;
        this.isPhoneNumberPublic = data.isPhoneNumberPublic;
        this.acceptedTosDate = data.acceptedTosDate
            ? new Date(data.acceptedTosDate)
            : null;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.role = data.role ? new Role(data.role) : null;
        this.department = data.department
            ? new Department(data.department)
            : null;
        this.notifications = data.notifications.map((n:any) => new Notification(n))
        this.allowedEmailNotifications = data.allowedEmailNotifications || false;
    }

    getAvatarOrDefaultUrl() {
        if (this.avatar) {
            return this.avatar.getUrl();
        }
        return `https://ui-avatars.com/api/?name=${this.querySafeName()}`;
    }
    querySafeName() {
        return this.name.replace(/ /g, "%20");
    }

    getSubtitle() {
        if (!this.role || !this.department) {
            return "Niet lid";
        }
        return `${this.role.name} bij ${this.department.parentCompany.name}`;
    }

    hasPermissionAtDepartment(
        permission: string,
        departmentId: number | null | undefined,
    ) {
        if (departmentId === null || departmentId === undefined) {
            return false;
        }
        if (!this.department || !this.role) {
            return false;
        }
        if (this.role.isMatchmaker) {
            return true;
        }
        if (this.department.id !== departmentId) {
            return false;
        }
        return this.role.permissions.some(
            (p: any) => p.codeName === permission,
        );
    }
}
