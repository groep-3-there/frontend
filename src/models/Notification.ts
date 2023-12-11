export class Notification {
    id: number;
    title: string;
    description: string;
    read: boolean;
    link: string;
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.read = data.read;
        this.link = data.userId;
    }
}