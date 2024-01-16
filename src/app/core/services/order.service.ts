import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { Order } from "../models";

@Injectable({
    providedIn:'root'
})
export class OrderService extends BaseTimeStampService<Order>{
    constructor(){
       super("orders");
    }
}