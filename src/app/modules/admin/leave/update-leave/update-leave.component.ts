import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LeaveService, UserService } from 'app/core/services';
import { Leave, User } from 'app/core/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-update-leave',
  standalone: true,
  imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatDatepickerModule,
    ],
  templateUrl: './update-leave.component.html',
  styleUrl: './update-leave.component.scss'
})
export class UpdateLeaveComponent  implements OnInit{
    updateForm:UntypedFormGroup
    @ViewChild('updateLeaveForm') updateLeaveForm:NgForm
    users:User[]=[]
    minDate=new Date();
    constructor(
        @Inject(MAT_DIALOG_DATA) public data:Leave,
        public dialogRef: MatDialogRef<UpdateLeaveComponent>,
        private formBuilder:FormBuilder,
        private leaveService:LeaveService,
        private userService:UserService
        ){}
    ngOnInit(): void {
        this.getUsers();
        this.createUpdateForm();
    }
    createUpdateForm(){
        this.updateForm=this.formBuilder.group({
            id:[this.data.id,Validators.required],
            userId:[this.data.userId,Validators.required],
            startDate:[this.data.startDate,Validators.required],
            endDate:[this.data.endDate,Validators.required]
        })
    }
    getUsers(){
        this.userService.getAllNotDeleted().subscribe(result=>{
            this.users=result.data;
        })
    }
    updateLeave(){
        this.updateForm.disable();
        if(this.updateForm.invalid){
            this.updateForm.enable();
            return;
        }
        let leave:Leave=Object.assign({},this.updateForm.value);
        this.leaveService.update(leave).subscribe(result=>{
            this.updateForm.enable();
            this.dialogRef.close();
        },error=>{
            this.updateForm.enable();
        })
    }
}
