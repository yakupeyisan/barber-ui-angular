import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { Product } from "../models";

@Injectable({
    providedIn:'root'
})
export class ProductService extends BaseTimeStampService<Product>{
    constructor(){
       super();
       this.path="products";
    }
}