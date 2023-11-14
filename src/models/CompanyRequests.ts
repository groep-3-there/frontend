export class CompanyRequests{
    id: number;
    name: string;
    requestedAt: string;
    tags: string;
    ownerId: number;
    branchId: number;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.requestedAt = data.requestedAt;
        this.tags = data.tags;
        this.ownerId = data.ownerId;
        this.branchId = data.branchId;
    }
}