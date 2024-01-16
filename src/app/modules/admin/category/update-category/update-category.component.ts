import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryService } from 'app/core/services';
import { Category } from 'app/core/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-category',
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
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent  implements OnInit{
    updateForm:UntypedFormGroup
    @ViewChild('updateCategoryForm') updateCategoryForm:NgForm
    constructor(@Inject(MAT_DIALOG_DATA) public data:Category, public dialogRef: MatDialogRef<UpdateCategoryComponent>,private formBuilder:FormBuilder,private categoryService:CategoryService){}
    ngOnInit(): void {
        this.createUpdateForm();
    }
    createUpdateForm(){
        this.updateForm=this.formBuilder.group({
            id:[this.data.id,Validators.required],
            name:[this.data.name,Validators.required]
        })
    }
    updateCategory(){
        this.updateForm.disable();
        if(this.updateForm.invalid){
            this.updateForm.enable();
            return;
        }
        let category:Category=Object.assign({},this.updateForm.value);
        this.categoryService.update(category).subscribe(result=>{
            this.updateForm.enable();
            this.dialogRef.close();
        },error=>{
            this.updateForm.enable();
        })
    }
}
