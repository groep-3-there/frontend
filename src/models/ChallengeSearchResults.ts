import { Challenge } from "./Challenge";

export class ChallengeSearchResults {
    content: Challenge[];
    totalPages: number;
    totalElements: number;

    constructor(data: any) {
        this.content = data.content.map(
            (challenge: any) => new Challenge(challenge),
        );

        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
    }
}
