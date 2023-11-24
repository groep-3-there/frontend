import { Department } from "./Department";

export class DepartmentCode {

    code : string
    department : Department


    constructor(data: any) {
        this.code = data.code;
        this.department = new Department(data.department);
    }
}
