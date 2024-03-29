import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})


export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user===null)
  }

  executeJWTAuthenticationService(username, password){
    
    return this.http.post<any>
        (`${API_URL}/authenticate`,{
          username,
          password
        })
        .pipe(
          map(
            data=>{
              sessionStorage.setItem(AUTHENTICATEDUSER, username);
              sessionStorage.setItem(AUTHTOKEN, `Bearer ${data.token}`);
              return data;
            }
          )
        )
  }

  
  executeAuthenticationService(username, password){
    
    let basicAuthHeaderString = 'Basic '+ window.btoa(username +':'+ password)

    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>
        (`${API_URL}/basicauth`,{headers})
        .pipe(
          map(
            data=>{
              sessionStorage.setItem(AUTHENTICATEDUSER, username);
              sessionStorage.setItem(AUTHTOKEN, basicAuthHeaderString);
              return data;
            }
          )
        )
  }

  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATEDUSER);
  }

  getAuthenticatedToken(){
    if(this.getAuthenticatedUser())
    return sessionStorage.getItem(AUTHTOKEN);
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATEDUSER);
    sessionStorage.removeItem(AUTHTOKEN);
  }
}

export const AUTHTOKEN = 'authToken'
export const AUTHENTICATEDUSER = 'authenticatedUser'

export class AuthenticationBean{
  constructor(public message: string){

  }
}