import { Company } from "./Company";
import { Department } from "./Department";
import { User } from "./User";
import { Image } from "./Image";
export class Challenge {
    id: number;
    author: User;
    department: Department;
    contactInformation: string;
    title: string;
    description: string;
    bannerImageId: number | null;
    banner: Image | null;
    concludingRemarks: string | null;
    summary: string;
    status: string;
    createdAt: Date;
    endDate: Date;
    tags: string;
    visibility: string;
    imageAttachments: Image[];
    constructor(data: any) {
        console.log(data);
        this.id = data.id;
        this.author = new User(data.author);
        this.department = new Department(data.department);
        this.contactInformation = data.contactInformation;
        this.title = data.title;
        this.description = data.description;
        this.bannerImageId = data.bannerImageId;
        this.banner = data.bannerImageId
            ? new Image({ id: data.bannerImageId })
            : null;

        this.concludingRemarks = data.concludingRemarks;
        this.summary = data.summary;
        this.status = data.status;
        this.createdAt = new Date(data.createdAt);
        this.endDate = new Date(data.endDate);
        this.tags = data.tags;
        this.visibility = data.visibility;
        this.imageAttachments = data.imageAttachmentsIds
            ? data.imageAttachmentsIds.map((d: any) => new Image({ id: d }))
            : [];
    }

    getBannerOrDefaultImageUrl() {
        if (this.banner) {
            return this.banner.getUrl();
        }
        return `/banner-default.jpg`;
    }
}
