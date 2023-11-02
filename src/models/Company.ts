import { Branch } from "./Branch"
import { User } from "./User"

export class Company{
    declare id : number
    declare name : string
    declare info : string
    declare profileImageId : number
    declare bannerImageId : number
    declare tags : string
    declare branch : Branch //needs change
    declare createdAt : string
    declare owner : User 
}
