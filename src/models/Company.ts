import { Branch } from "./Branch"
import { Image } from "./Image"
import { User } from "./User"

export class Company{
    id : number
    name : string
    info : string
    profileImage : Image | null
    bannerImage : Image | null
    tags : string
    branch : Branch
    createdAt : string
    owner : User 

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.info = data.info;
        this.profileImage = data.profileImageId ? new Image({id: data.profileImageId}) : null
        this.bannerImage = data.bannerImageId ? new Image({id: data.bannerImageId}) : null
        this.tags = data.tags;
        this.branch = data.branch;
        this.createdAt = data.createdAt;
        this.owner = data.owner;
    }

    getProfileOrDefaultImageUrl(){
        if(this.profileImage){
            return this.profileImage.getUrl()
        }
        return `https://ui-avatars.com/api/?name=${this.querySafeName()}`;
    }

    

    querySafeName(){
        return this.name.replace(/ /g, '%20');
    }
}
