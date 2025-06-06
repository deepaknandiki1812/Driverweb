export interface Driver {
Join: any;
photoUrl: any;
  id?: number;
  name?: string;
  email?: string;
  address?: string;
  vehicleNumber?: string;
  joindate?: Date;
  image?: Blob[];
  vehicletype?:string;
  licence?:string;
  status?:string;

 // photoUrl?: string;
}

export class DriverDetails implements Driver{
 constructor(
  public id?: number,
  public name?: string,
  public email?: string,
  public address?: string,
  public vehicleNumber?: string,
  public joindate?: Date,
  public image?: Blob[],
  public vehicletype?:string,
  public licence?:string,
  public status?:string,
  //public photoUrl?: string
){}
  Join: any;
  photoUrl: any;
 
  
}

