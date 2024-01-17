import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeaveService } from 'app/core/services';
import { Leave, User } from 'app/core/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-leave',
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
  templateUrl: './add-leave.component.html',
  styleUrl: './add-leave.component.scss'
})
export class AddLeaveComponent  implements OnInit{
    addForm:UntypedFormGroup
    @ViewChild('addLeaveForm') addLeaveForm:NgForm
    users:User[]=[]
    constructor(public dialogRef: MatDialogRef<AddLeaveComponent>,private formBuilder:FormBuilder,private leaveService:LeaveService){}
    ngOnInit(): void {
        this.createAddForm();
    }
    createAddForm(){
        this.addForm=this.formBuilder.group({
            name:[null,Validators.required]
        })
    }
    addLeave(){
        this.addForm.disable();
        if(this.addForm.invalid){
            this.addForm.enable();
            return;
        }
        let leave:Leave=Object.assign({},this.addForm.value);
        this.leaveService.create(leave).subscribe(result=>{
            this.addForm.enable();
            this.dialogRef.close();
        },error=>{
            this.addForm.enable();
        })
    }
}
