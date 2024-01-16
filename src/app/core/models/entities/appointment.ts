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

export interface AppointmentServices extends Appointment{
    services:Service[];
    amount:number|null;
}
export interface AppointmentWithUserAndServices extends Appointment{
    services:Service[];
    user:User;
}