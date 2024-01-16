export interface BaseModel<T>{
    id:T;
}


export interface BaseTimeStampModel<T> extends BaseModel<T>{
    createdAt:string|null;
    createdUser:number|null;
    updatedAt:string|null;
    updatedUser:number|null;
    isUpdated:boolean|null;
    deletedAt:string|null;
    deletedUser:number|null;
    isDeleted:boolean|null;
}

export interface Response{
 success:boolean;
 message:string;
 key:string;
}
export interface DataResponse<T> extends Response{
    data:T;
}