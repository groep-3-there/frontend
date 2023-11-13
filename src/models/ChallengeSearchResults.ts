import { Challenge } from "./Challenge";

export class ChallengeSearchResults {
    content: Challenge[];
    totalPages: number;
    totalElements: number;

    constructor(data: any) {
        this.content = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
    }
}
