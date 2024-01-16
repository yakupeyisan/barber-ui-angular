import { BaseModel } from "../index";

export interface Photo extends BaseModel<number>{
    smallUrl:string|null;
    mediumUrl:string|null;
    largeUrl:string|null;
    isShowSlider:boolean|null;
    isShowGallery:boolean|null;
}