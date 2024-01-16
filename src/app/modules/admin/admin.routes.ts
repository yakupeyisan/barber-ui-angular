import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { CategoryComponent } from "./category/category.component";

export default[
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:'appointments', component:AppointmentComponent},
    {path:'categories', component:CategoryComponent}
] as Routes;