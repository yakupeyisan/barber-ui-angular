import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from '@barber/components/card';
import { Leave } from 'app/core/models';
import { LeaveService } from 'app/core/services';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddLeaveComponent } from './add-leave/add-leave.component';
import { UpdateLeaveComponent } from './update-leave/update-leave.component';
import { BarberConfirmationService } from '@barber/services/confirmation';
import { BarberLoadingBarComponent } from '@barber/components/loading-bar';
import { BarberLoadingService } from '@barber/services/loading';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BarberCardComponent,
    MatIconModule,
    BarberLoadingBarComponent
],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit {
    leaves:Leave[]=[]
    constructor(private leaveService:LeaveService,
        private matDialog:MatDialog,
        private barberConfirmationService:BarberConfirmationService,
        private barberLoadingService:BarberLoadingService){}
    ngOnInit(): void {
        this.getList();
    }
    getList(){
        this.barberLoadingService.show();
        this.leaveService.getAll().subscribe(result=>{
            this.leaves=result.data
            this.barberLoadingService.hide();
        })
    }
    showAdd(){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(AddLeaveComponent, {
            height:'228px',
            width:"60%",
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    showUpdate(leave:Leave){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(UpdateLeaveComponent, {
            height:'500px',
            width:"60%",
            autoFocus: false,
            data:leave
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    deleteDialog(leave:Leave){
        let dialogRef=this.barberConfirmationService.open({
            title: "Delete Leave",
            "message": "Are you sure you want to delete <b>\""+leave.id+"\"</b> leave? <span class=\"font-medium\">This action cannot be undone!</span>",
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
                this.leaveService.deleteById(leave.id).subscribe(result=>{
                    this.getList();
                })
            }
          })
    }
}
