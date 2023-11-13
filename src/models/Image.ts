import API from "@/Api";

export class Image {
    id: number;
    photoData: Uint8Array[];

    constructor(data: any) {
        this.id = data.id;
        this.photoData = data.photoData;
    }

    getUrl() {
        return `${API.BASEURL}image/${this.id}`;
    }
}
