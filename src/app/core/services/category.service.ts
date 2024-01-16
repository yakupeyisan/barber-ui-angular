import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Category } from "../models";

@Injectable({
    providedIn:'root'
})
export class CategoryService extends BaseService<Category>{
    constructor(){
       super();
       this.path="categories";
    }
}