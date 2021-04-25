import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  welcomeMessageFromService: string; 

  constructor(private route: ActivatedRoute,
              private service: WelcomeDataService) { }

  name = ''
  ngOnInit(): void {
    this.name = this.route.snapshot.params[('name')];
   }

   getWelcomeMessage(){
     this.service.executeHelloWorldBeanService().subscribe(
       response => this.handleSuccessfulResponse(response),
       error => this.handleErrorResponse(error)
     );
   }

   getWelcomeMessageWithPathVariable(name){
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

   handleSuccessfulResponse(response){
     console.log(response.message);
     this.welcomeMessageFromService = response.message;
   }

   handleErrorResponse(error){
    console.log(error.error);
    console.log(error.error.message);
    this.welcomeMessageFromService = error.error.message;
   }

}
