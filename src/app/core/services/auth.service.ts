import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { DataResponse, TokenResponseDto, UserForLoginDto } from "../models";
import { Observable, catchError, of, switchMap } from "rxjs";
import { environment } from "app/environments/environment";
import { UserService } from "./user.service";

@Injectable({providedIn:'root'})
export class AuthService{
    private _authenticated: boolean = false;

    constructor(private httpClient:HttpClient,private userService:UserService){}

    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }
    get authenticated(){
        return this._authenticated;
    }

    login(userForLoginDto:UserForLoginDto):Observable<DataResponse<TokenResponseDto>>{
        return this.httpClient.post<DataResponse<string>>(environment.getApiUrl("auth/login"),userForLoginDto).pipe(
            switchMap((response: any) =>
            {
                let result= response as DataResponse<TokenResponseDto>;
                // Store the access token in the local storage
                this.accessToken = result.data.token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this.userService.user = result.data.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }
    isLogin():Observable<boolean>{
        return this.httpClient.post<boolean>(environment.getApiUrl("auth/is-login"),{})
    }
    setAllCredentials():Observable<boolean>{
        return this.httpClient.get<boolean>(environment.getApiUrl("auth/set-all-credentials"))
    }
    getLoginUser(): Observable<any>
    {
        // Sign in using the token
        return this.httpClient.post(environment.getApiUrl("auth/get-login-user"),{}).pipe(
            catchError(() =>

                // Return false
                of(false),
            ),
            switchMap((response: any) =>
            {
                this._authenticated = true;
                this.userService.user = response;
                return of(true);
            }),
        );
    }
    signOut(): Observable<boolean>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }
    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.getLoginUser();
    }
}