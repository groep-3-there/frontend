import { Branch } from "./Branch";
import { User } from "./User";

export class CompanyRequests{
    id: number;
    name: string;
    requestedAt: string;
    tags: string;
    owner: User;
    branch: Branch;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.requestedAt = data.requestedAt;
        this.tags = data.tags;
        this.owner = data.owner;
        this.branch = data.branch;
    }
}