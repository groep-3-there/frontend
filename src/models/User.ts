import { Image } from "./Image";
import { Role } from "./Role";

export class User{
    id: number;
    name: string;
    info : string;
    tags: string;
    createdAt: Date;
    lastSeen: Date;
    // avatarImageId : number | null;
    avatar : Image | null;
    isEmailPublic: boolean;
    isPhoneNumberPublic: boolean;
    acceptedTosDate: Date | null;
    email: string;
    phoneNumber: string;
    role : Role | null;
    
    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.info = data.info;
        this.tags = data.tags;
        this.createdAt = new Date(data.createdAt);
        this.lastSeen = new Date(data.lastSeen);
        // this.avatarImageId = data.avatarImageId;
        this.avatar = data.avatarImageId ? new Image({id: data.avatarImageId}) : null
        this.isEmailPublic = data.isEmailPublic;
        this.isPhoneNumberPublic = data.isPhoneNumberPublic;
        this.acceptedTosDate = data.acceptedTosDate ? new Date(data.acceptedTosDate) : null;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber;
        this.role = new Role(data.role);
    }

    getAvatarOrDefaultUrl(){
        if(this.avatar){
            return this.avatar.getUrl()
        }
        return `https://ui-avatars.com/api/?name=${this.querySafeName()}`;
    }
    querySafeName(){
        return this.name.replace(/ /g, '%20');
    }

    getSubtitle() {
        if(!this.role){
            return "Werkloos"
        }
        return `${this.role.name} at ${this.role.department.name}`
    }

    hasPermissionAtCompany(permission : string, companyId : number | null | undefined){
        console.log(permission, companyId)
        console.log(this.role)
        if(companyId === null || companyId === undefined){
            return false
        }
        if(!this.role){
            return false
        }
        if(this.role.isMatchmaker){
            return true;
        }
        if(this.role.company.id !== companyId){
            return false
        }
        return this.role.permissions.some((p : any) => p.name === permission)
    }
  

}

