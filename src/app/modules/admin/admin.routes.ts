import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentComponent } from "./appointment/appointment.component";

export default[
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:'appointments', component:AppointmentComponent},
] as Routes;