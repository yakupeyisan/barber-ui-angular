import { Injectable } from "@angular/core";
import { BaseTimeStampService } from "./base.service";
import { User } from "../models";
import { Observable, ReplaySubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class UserService extends BaseTimeStampService<User>{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor(){
        super();
        this.path="users";
     }
     
    set user(value: User)
    {
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }
}