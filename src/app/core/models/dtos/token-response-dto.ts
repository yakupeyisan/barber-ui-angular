import { User } from "..";

export interface TokenResponseDto{
    token:string;
    user:User
}