export interface User {

  id?: number;
  username?: string; 
  firstname?: string;
  lastname?: string ;
  email?: string ;
  address?: string ;
  contact?: string ;
  password?: string ;
}

export class UserDetails implements User {
    constructor(
       public id?: number,
       public username?: string, 
       public firstname?: string,
       public lastname?: string,
       public email?: string,
       public address?: string,
       public contact?: string,
       public password?: string,
    ){}
 
}