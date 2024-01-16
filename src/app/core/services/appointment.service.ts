import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { Appointment, AppointmentWithUserAndServices, DataResponse } from "../models";
import { Observable } from "rxjs";
import { environment } from "app/environments/environment";

@Injectable({
    providedIn:'root'
})
export class AppointmentService extends BaseTimeStampService<Appointment>{
    constructor(){
       super("appointments");
    }
    getAllNotDeletedWithUserAndServices():Observable<DataResponse<AppointmentWithUserAndServices[]>>{
        return this.httpClient.get<DataResponse<AppointmentWithUserAndServices[]>>(environment.getApiUrl('appointments/get-all-not-deleted-with-user-and-services'))
    }
}