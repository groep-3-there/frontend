export class Permission{
   id : number;
   codeName : string;
   description : string;
   fancyName : string;
   
   constructor(data: any) {
         this.id = data.id;
         this.codeName = data.codeName;
         this.description = data.description;
         this.fancyName = data.fancyName;
    }
}