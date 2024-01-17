import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServiceService } from 'app/core/services';
import { Service } from 'app/core/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-service',
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
  templateUrl: './update-service.component.html',
  styleUrl: './update-service.component.scss'
})
export class UpdateServiceComponent  implements OnInit{
    updateForm:UntypedFormGroup
    @ViewChild('updateServiceForm') updateServiceForm:NgForm
    constructor(@Inject(MAT_DIALOG_DATA) public data:Service, public dialogRef: MatDialogRef<UpdateServiceComponent>,private formBuilder:FormBuilder,private serviceService:ServiceService){}
    ngOnInit(): void {
        this.createUpdateForm();
    }
    createUpdateForm(){
        this.updateForm=this.formBuilder.group({
            id:[this.data.id,Validators.required],
            name:[this.data.name,Validators.required],
            duration:[this.data.duration,Validators.required],
            price:[this.data.price,Validators.required],
        })
    }
    updateService(){
        this.updateForm.disable();
        if(this.updateForm.invalid){
            this.updateForm.enable();
            return;
        }
        let service:Service=Object.assign({},this.updateForm.value);
        this.serviceService.update(service).subscribe(result=>{
            this.updateForm.enable();
            this.dialogRef.close();
        },error=>{
            this.updateForm.enable();
        })
    }
}
