import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from '@barber/components/card';
import { Service } from 'app/core/models';
import { ServiceService } from 'app/core/services';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from './add-service/add-service.component';
import { UpdateServiceComponent } from './update-service/update-service.component';
import { BarberConfirmationService } from '@barber/services/confirmation';
import { BarberLoadingBarComponent } from '@barber/components/loading-bar';
import { BarberLoadingService } from '@barber/services/loading';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BarberCardComponent,
    MatIconModule,
    BarberLoadingBarComponent
],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent implements OnInit {
    services:Service[]=[]
    constructor(private serviceService:ServiceService,
        private matDialog:MatDialog,
        private barberConfirmationService:BarberConfirmationService,
        private barberLoadingService:BarberLoadingService){}
    ngOnInit(): void {
        this.getList();
    }
    getList(){
        this.barberLoadingService.show();
        this.serviceService.getAllNotDeleted().subscribe(result=>{
            this.services=result.data
            this.barberLoadingService.hide();
        })
    }
    showAdd(){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(AddServiceComponent, {
            height:'413px',
            width:"60%",
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    showUpdate(service:Service){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(UpdateServiceComponent, {
            height:'413px',
            width:"60%",
            autoFocus: false,
            data:service
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    deleteDialog(service:Service){
        let dialogRef=this.barberConfirmationService.open({
            title: "Delete Service",
            "message": "Are you sure you want to delete <b>\""+service.name+"\"</b> service? <span class=\"font-medium\">This action cannot be undone!</span>",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation-triangle",
              "color": "warn"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "Delete",
                "color": "warn"
              },
              "cancel": {
                "show": true,
                "label": "Cancel"
              }
            },
            "dismissible": true
          })
          dialogRef.afterClosed().subscribe(result=>{
            if(result=='confirmed'){
                this.serviceService.deleteById(service.id).subscribe(result=>{
                    this.getList();
                })
            }
          })
    }
}
