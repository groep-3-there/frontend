import { Company } from "./Company";

export class Department {
    id: number;
    name: string;
    parentCompany: Company;
    createdAt: Date;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.parentCompany = new Company(data.parentCompany);
        this.createdAt = new Date(data.createdAt);
    }
}
