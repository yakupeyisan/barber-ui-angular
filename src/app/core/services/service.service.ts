import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { Service } from "../models";

@Injectable({
    providedIn:'root'
})
export class ServiceService extends BaseTimeStampService<Service>{
    constructor(){
       super("services");
    }
}