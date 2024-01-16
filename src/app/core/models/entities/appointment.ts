import { BaseTimeStampModel, User } from "../index";
import { Service } from "./service";

export interface Appointment extends BaseTimeStampModel<number>{
    userId:number;
    fullName:string|null;
    phoneNumber:string|null;
    email:string|null;
    startDate:string|null;
    endDate:string|null;
    isCompleted:boolean|null;
} 

export interface AppointmentServiceDto{
    services:Service;
    serviceId:number|null;
    appointmentId:number|null;
    amount:number|null;
}
export interface AppointmentWithUserAndServices extends Appointment{
    appointmentServices:AppointmentServiceDto[];
    user:User;
}