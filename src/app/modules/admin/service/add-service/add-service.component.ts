import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceService } from 'app/core/services';
import { Service } from 'app/core/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-service',
  standalone: true,
  imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent  implements OnInit{
    addForm:UntypedFormGroup
    @ViewChild('addServiceForm') addServiceForm:NgForm
    constructor(public dialogRef: MatDialogRef<AddServiceComponent>,private formBuilder:FormBuilder,private serviceService:ServiceService){}
    ngOnInit(): void {
        this.createAddForm();
    }
    createAddForm(){
        this.addForm=this.formBuilder.group({
            name:[null,Validators.required],
            duration:[null,Validators.required],
            price:[null,Validators.required]
        })
    }
    addService(){
        this.addForm.disable();
        if(this.addForm.invalid){
            this.addForm.enable();
            return;
        }
        let service:Service=Object.assign({},this.addForm.value);
        this.serviceService.create(service).subscribe(result=>{
            this.addForm.enable();
            this.dialogRef.close();
        },error=>{
            this.addForm.enable();
        })
    }
}
