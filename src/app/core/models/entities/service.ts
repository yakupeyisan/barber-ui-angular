import { BaseModel } from "../index";

export interface Service extends BaseModel<number>{
    name:string|null;
    duration:number|null;
    price:number|null;
}