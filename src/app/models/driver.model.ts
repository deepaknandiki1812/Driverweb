// import { Moment } from "moment";
import { Timestamp } from "rxjs";


export interface Driver {
Join: any;
photoUrl: any;
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  vehicleNumber?: string;
  joindate?: String;
  imagepath?: Blob[];
  vehicletype?:string;
  licencepath?:string;
  status?:Boolean;

 // photoUrl?: string;
}

export class DriverDetails implements Driver{
 constructor(
  public id?: number,
  public name?: string,
  public email?: string,
  public address?: string,
  public vehicleNumber?: string,
  public joindate?: String,
  public imagepath?: Blob[],
  public vehicletype?:string,
  public licencepath?:string,
  public status?:Boolean,
  //public photoUrl?: string
){}
  Join: any;
  photoUrl: any;
 
  
}

