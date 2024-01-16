import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { UserService } from 'app/core/services';
import { User } from 'app/core/models';

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule,MatIconModule, FormsModule, MatFormFieldModule, NgClass, MatInputModule, TextFieldModule, ReactiveFormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.scss'
})
export class AddAppointmentComponent  implements OnInit{
    formFieldHelpers: string[] = [''];
    users:User[]=[]
    constructor(private userService:UserService){}
    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(){
        this.userService.getAllNotDeleted().subscribe(result=>{
            this.users=result.data;
        })
    }

}
