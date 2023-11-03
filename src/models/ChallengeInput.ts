import { User } from "./User"

export class ChallengeInput{
    declare id: number
    declare author: User
    declare type : string
    declare text : string
    declare isChosenAnswer: boolean
    declare createdAt : string
}