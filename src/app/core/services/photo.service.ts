import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { Photo } from "../models";

@Injectable({
    providedIn:'root'
})
export class PhotoService extends BaseService<Photo>{
    constructor(){
       super("photos");
    }
}