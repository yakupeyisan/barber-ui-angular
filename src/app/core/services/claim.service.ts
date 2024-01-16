import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Claim } from "../models";

@Injectable({
    providedIn:'root'
})
export class ClaimService extends BaseService<Claim>{
    constructor(){
       super("claims");
    }
}