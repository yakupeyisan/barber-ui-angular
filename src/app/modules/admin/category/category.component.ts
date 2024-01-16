import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarberCardComponent } from '@barber/components/card';
import { Category } from 'app/core/models';
import { CategoryService } from 'app/core/services';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { BarberConfirmationService } from '@barber/services/confirmation';
import { BarberLoadingBarComponent } from '@barber/components/loading-bar';
import { BarberLoadingService } from '@barber/services/loading';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    BarberCardComponent,
    MatIconModule,
    BarberLoadingBarComponent
],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
    categories:Category[]=[]
    constructor(private categoryService:CategoryService, 
        private matDialog:MatDialog,
        private barberConfirmationService:BarberConfirmationService,
        private barberLoadingService:BarberLoadingService){}
    ngOnInit(): void {
        this.getList();
    }
    getList(){
        this.barberLoadingService.show();
        this.categoryService.getAll().subscribe(result=>{
            this.categories=result.data
            this.barberLoadingService.hide();
        })
    }
    showAdd(){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(AddCategoryComponent, {
            height:'228px',
            width:"60%",
            autoFocus: false,
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    showUpdate(category:Category){
        this.barberLoadingService.show();
        let dialogRef= this.matDialog.open(UpdateCategoryComponent, {
            height:'228px',
            width:"60%",
            autoFocus: false,
            data:category
        });
        dialogRef.afterClosed().subscribe(()=>{
            this.getList();
        })
    }
    deleteDialog(category:Category){
        let dialogRef=this.barberConfirmationService.open({
            title: "Delete Category",
            "message": "Are you sure you want to delete <b>\""+category.name+"\"</b> category? <span class=\"font-medium\">This action cannot be undone!</span>",
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
                this.categoryService.deleteById(category.id).subscribe(result=>{
                    this.getList();
                })
            }
          })
    }
}
