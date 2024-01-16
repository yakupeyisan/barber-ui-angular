import { BaseModel } from "../index";

export interface Leave extends BaseModel<number>{
    userId:number;
    startDate:string|null;
    endDate:string|null;
}