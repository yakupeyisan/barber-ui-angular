import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { DataResponse, Response } from "../models";
import { environment } from "app/environments/environment";

@Injectable({providedIn:"root"})
export abstract class BaseService<T>{
    private readonly _httpClient:HttpClient = inject(HttpClient);
    private _path:string='unknown';
    constructor(path:string){
        this._path=path;
    }
    get httpClient(){
        return this._httpClient;
    }
    get path(){
        return this._path;
    }
    getAll():Observable<DataResponse<T[]>>{
        return this._httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`${this._path}/get-all`))
    }
    getAllWithType<K>():Observable<DataResponse<K[]>>{
        return this._httpClient.get<DataResponse<K[]>>(environment.getApiUrl(`${this._path}/get-all`))
    }
    getById(id:number):Observable<DataResponse<T>>{
        return this._httpClient.get<DataResponse<T>>(environment.getApiUrl(`${this._path}/get-by-id/${id}`))
    }
    getByIdWithType<K>(id:number):Observable<DataResponse<K>>{
        return this._httpClient.get<DataResponse<K>>(environment.getApiUrl(`${this._path}/get-by-id/${id}`))
    }
    create(entity:T):Observable<Response>{
        return this._httpClient.post<Response>(environment.getApiUrl(`${this._path}/create`),entity)
    }
    createWithType<K>(entity:K):Observable<Response>{
        return this._httpClient.post<Response>(environment.getApiUrl(`${this._path}/create`),entity)
    }
    update(entity:T):Observable<Response>{
        return this._httpClient.put<Response>(environment.getApiUrl(`${this._path}/update`),entity)
    }
    updateWithType<K>(entity:K):Observable<Response>{
        return this._httpClient.put<Response>(environment.getApiUrl(`${this._path}/update`),entity)
    }
    deleteById(id:number):Observable<Response>{
        return this._httpClient.delete<Response>(environment.getApiUrl(`${this._path}/delete-by-id/${id}`))
    }
}

@Injectable({providedIn:"root"})
export abstract class BaseTimeStampService<T> extends BaseService<T>{
    constructor(path:string){
        super(path)
    }
    getAllDeleted():Observable<DataResponse<T[]>>{
        return this.httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`${this.path}/get-all-deleted`))
    }
    getAllDeletedWithType<K>():Observable<DataResponse<K[]>>{
        return this.httpClient.get<DataResponse<K[]>>(environment.getApiUrl(`${this.path}/get-all-deleted`))
    }
    getAllNotDeleted():Observable<DataResponse<T[]>>{
        return this.httpClient.get<DataResponse<T[]>>(environment.getApiUrl(`${this.path}/get-all-not-deleted`))
    }
    getAllNotDeletedWithType<K>():Observable<DataResponse<K[]>>{
        return this.httpClient.get<DataResponse<K[]>>(environment.getApiUrl(`${this.path}/get-all-not-deleted`))
    }
    hardDeleteById(id:number):Observable<Response>{
        return this.httpClient.delete<Response>(environment.getApiUrl(`${this.path}/hard-delete-by-id/${id}`))
    }
    restoreDeleteById(id:number):Observable<Response>{
        return this.httpClient.delete<Response>(environment.getApiUrl(`${this.path}/hard-delete-by-id/${id}`))
    }
}