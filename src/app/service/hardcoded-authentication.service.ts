import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  //if(this.username==='in28minutes' && this.password==='dummy')
  constructor() { }

  authenticate(username: string, password: string){
    if(username==='in28minutes' && password==='dummy'){
      sessionStorage.setItem('authenticatedUser', username);
        return true
    }
    return false
  }
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user===null)
  }
  logout(){
    sessionStorage.removeItem('authenticatedUser');
  }
}
