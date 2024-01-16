import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Leave } from "../models";

@Injectable({
    providedIn:'root'
})
export class LeaveService extends BaseService<Leave>{
    constructor(){
       super("leaves");
    }
}