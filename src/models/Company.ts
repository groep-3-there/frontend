import { Branch } from "./Branch";
import { Country } from "./Country";
import { Image } from "./Image";
import { User } from "./User";

export class Company {
    id: number;
    name: string;
    info: string;
    profileImageId: number | null;
    profileImage: Image | null;
    bannerImageId: number | null;
    banner: Image | null;
    tags: string;
    branch: Branch;
    createdAt: Date;
    ownerId: number;
    country: Country;
    followerIds: number[];

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.info = data.info;
        this.profileImageId = data.profileImageId
        this.profileImage = data.profileImageId
            ? new Image({ id: data.profileImageId })
            : null;
        this.bannerImageId = data.bannerImageId
        this.banner = data.bannerImageId
            ? new Image({ id: data.bannerImageId })
            : null;
        this.tags = data.tags;
        this.branch = data.branch;
        this.createdAt = data.createdAt;
        this.ownerId = data.ownerId;
        this.country = new Country(data.country);
        this.followerIds = data.followerIds;
    }

    getProfileOrDefaultImageUrl() {
        if (this.profileImage) {
            return this.profileImage.getUrl();
        }
        return `https://ui-avatars.com/api/?name=${this.querySafeName()}?size=128`;
    }
    getTagList(){
        if(this.tags === null || this.tags === undefined || this.tags === '')
            return []
        return this.tags.split(',')
    }
    getBannerForCompany() {
        if (this.banner) {
            return this.banner.getUrl();
        }
        return `/banners/banner-1.jpg`;
    }

    querySafeName() {
        return this.name.replace(/ /g, "%20");
    }
}
