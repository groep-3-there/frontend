import { Branch } from "./Branch";
import { Country } from "./Country";
import { User } from "./User";

export class CompanyRequests {
    id: number;
    name: string;
    requestedAt: string;
    tags: string;
    owner: User;
    branch: Branch;
    country: Country;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.requestedAt = data.requestedAt;
        this.tags = data.tags;
        this.owner = data.owner;
        this.branch = data.branch;
        this.country = new Country(data.country);
    }
    getTagList(){
        if(this.tags === null || this.tags === undefined || this.tags === '')
            return []
        return this.tags.split(',')
    }
}
