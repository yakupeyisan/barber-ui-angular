import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { BarberCardComponent } from '@barber/components/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppointmentService } from 'app/core/services';
import { Appointment, AppointmentWithUserAndServices } from 'app/core/models';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule,BarberCardComponent,MatIconModule,MatButtonModule],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
    appointments:AppointmentWithUserAndServices[]=[]
    constructor(private appointmentService:AppointmentService,
        private matDialog: MatDialog){}
    ngOnInit(): void {
        this.getList();
    }

    getList(){
        this.appointmentService.getAllNotDeletedWithUserAndServices().subscribe(result=>{
            this.appointments=result.data;
        })
    }
    createNew(): void
    {
        this.matDialog.open(AddAppointmentComponent, {
            autoFocus: false,
            data     : {
                note: {},
            },
        });
    }

}
