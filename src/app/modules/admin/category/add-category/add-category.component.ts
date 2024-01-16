import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryService } from 'app/core/services';
import { Category } from 'app/core/models';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-category',
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
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent  implements OnInit{
    addForm:UntypedFormGroup
    @ViewChild('addCategoryForm') addCategoryForm:NgForm
    constructor(public dialogRef: MatDialogRef<AddCategoryComponent>,private formBuilder:FormBuilder,private categoryService:CategoryService){}
    ngOnInit(): void {
        this.createAddForm();
    }
    createAddForm(){
        this.addForm=this.formBuilder.group({
            name:[null,Validators.required]
        })
    }
    addCategory(){
        this.addForm.disable();
        if(this.addForm.invalid){
            this.addForm.enable();
            return;
        }
        let category:Category=Object.assign({},this.addForm.value);
        this.categoryService.create(category).subscribe(result=>{
            this.addForm.enable();
            this.dialogRef.close();
        },error=>{
            this.addForm.enable();
        })
    }
}
