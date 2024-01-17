import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ServiceService, UserService } from 'app/core/services';
import { CreateAppointmentDto, Service, User } from 'app/core/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule
    ],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.scss'
})
export class AddAppointmentComponent  implements OnInit{
    addForm:UntypedFormGroup
    @ViewChild('addAppointmentForm') addCategoryForm:NgForm
    users:User[]=[]
    services:Service[]=[]
    minDate=new Date();
    constructor(
        public dialogRef: MatDialogRef<AddAppointmentComponent>,
        private formBuilder:FormBuilder,
        private userService:UserService,
        private serviceService:ServiceService
        ){}
    ngOnInit(): void {
        this.createAddForm(undefined);
        this.getUsers();
        this.getServices();
    }

    getUsers(){
        this.userService.getAllNotDeleted().subscribe(result=>{
            this.users=result.data;
        })
    }
    getServices(){
        this.serviceService.getAllNotDeleted().subscribe(result=>{
            this.services=result.data;
        })
    }
    createAddForm(data:CreateAppointmentDto|undefined){
        this.addForm=this.formBuilder.group({
            email:[data?.email,Validators.required],
            phoneNumber:[data?.phoneNumber,Validators.required],
            services:[data?.services??[],Validators.required],
            userId:[data?.fullName,Validators.required],
            startDate:[data?.startDate,Validators.required],
        })
    }
    getSelectedServiceIds():number[]{
        let createAppointmentDto:CreateAppointmentDto= Object.assign({},this.addForm.value)
        return createAppointmentDto.services
    }
    getSelectedServices(){
        let services=this.getSelectedServiceIds().map(id=>{
            return this.services.find(service=>service.id==id)
        })
        return services;
    }
    getServiceTotalPrice(){
        return this.getSelectedServices().map(service=>service.price).reduce((total,item)=>{return total+item},0)
    }
    getServiceTotalDuration(){
        return this.getSelectedServices().map(service=>service.duration).reduce((total,item)=>{return total+item},0)
    }

}
