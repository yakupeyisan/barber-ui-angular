import { BaseModel } from "../index";
import { Product } from "./product";

export interface Category extends BaseModel<number>{
    name:string;
}
export interface CategoryWithProduct extends Category{
    products:Product[]
}