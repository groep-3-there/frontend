import { CompanyRequests } from "./CompanyRequests";

export class CompanyRequestsResults {
    content: CompanyRequests[];
    totalPages: number;
    totalElements: number;

    constructor(data: any) {
        this.content = data.content.map(
            (companyRequests: any) => new CompanyRequests(companyRequests),
        );

        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
    }
}
