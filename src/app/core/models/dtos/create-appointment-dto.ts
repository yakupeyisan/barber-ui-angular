export interface CreateAppointmentDto{
    userId:number;
    fullName:string;
    phoneNumber:string;
    email:string;
    startDate:string;
    services:number[]
}