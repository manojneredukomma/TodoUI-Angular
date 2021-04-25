import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean{
  constructor(public message:string){
  }
}

@Injectable({
  providedIn: 'root'
})


export class WelcomeDataService {

  constructor(private http:HttpClient) { }

  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world-bean/path-variable/${name}`);
  }

  //"/hello-world-bean/path-variable/{name}"
  executeHelloWorldBeanServiceWithPathVariable(name){
    //Header is not required as we have Interceptor which passes the header, so commenting this
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader()

    // let headers = new HttpHeaders({
    //   Authorization : basicAuthHeaderString
    // })
    return this.http.get<HelloWorldBean>
        (`${API_URL}/hello-world-bean/path-variable/${name}`
        // ,{headers}
        );
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'Manoj'
  //   let password = 'dummy'
  //   let basicAuthHeaderString = 'Basic '+ window.btoa(username +':'+ password)
  //   return basicAuthHeaderString;
  // }
}
