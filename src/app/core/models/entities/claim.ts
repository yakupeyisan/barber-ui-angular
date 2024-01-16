import { BaseModel } from "../index";

export interface Claim extends BaseModel<number>{
    name:string;
}