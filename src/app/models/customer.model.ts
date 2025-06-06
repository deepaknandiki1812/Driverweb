export interface Customer {

  id?: number;  // Optional for new customers, required for existing
  name?: string;
  contact?: string;  // Changed to match your form control name
  address?: string;
  email?: string;
}
export class CustomerDetails implements Customer{
 constructor(
  public id?: number,
  public name?: string,
  public email?: string,
  public address?: string,
  public contact?: string,
  //public photoUrl?: string
){} 
}

