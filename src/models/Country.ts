export class Country {
    code: string;
    name: string;

    constructor(data: any) {
        this.code = data.code;
        this.name = data.name;
    }

    getImageUrl(){
        return `https://flagicons.lipis.dev/flags/4x3/${this.code.toLowerCase()}.svg`;
    }
}
