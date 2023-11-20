import { Challenge } from "./Challenge";
import { User } from "./User";

export class ChallengeInput {
    id: number;
    author: User;
    type: string;
    text: string;
    isChosenAnswer: boolean;
    createdAt: Date;
    challenge: Challenge;

    constructor(data: any) {
        this.id = data.id;
        this.author = new User(data.author);
        this.type = data.type;
        this.text = data.text;
        this.isChosenAnswer = data.isChosenAnswer;
        this.createdAt = new Date(data.createdAt);
        this.challenge = new Challenge(data.challenge);
    }

    getReactionTypeAsName() {
        if (this.type === "QUESTION") {
            return "Vraag";
        }
        if (this.type === "FEEDBACK") {
            return "Feedback";
        }
        if (this.type === "IDEA") {
            return "Idee";
        }
    }
}
