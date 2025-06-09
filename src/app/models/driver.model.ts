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
  image?: Blob[];
  vehicletype?:string;
  licence?:string;
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
  public image?: Blob[],
  public vehicletype?:string,
  public licence?:string,
  public status?:Boolean,
  //public photoUrl?: string
){}
  Join: any;
  photoUrl: any;
 
  
}

