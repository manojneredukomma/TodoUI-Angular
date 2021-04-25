import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public targetDate: Date,
    public done: boolean
  ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})

export class ListTodosComponent implements OnInit {

  deleteMessage: string = '';
  constructor(private todoDataService: TodoDataService,
              private router: Router,
              private basicAuthenticationService: BasicAuthenticationService) { }

  todos = []
  username: string;

  ngOnInit(): void {
    this.username = this.basicAuthenticationService.getAuthenticatedUser();
    this.refreshTodos();
  }

  
  refreshTodos(){
    
    this.todoDataService.getAllTodos(this.username)
    .subscribe(response => {
      this.todos = response;
      console.log(response);
    }
    )
  }

  deleteTodo(id) {
    console.log(`delete to do ${id}`);
    this.todoDataService.deleteTodo(this.username, id)
      .subscribe(
        response => {
          console.log(response)
          this.deleteMessage = `Delete of Todo ${id} is successful`
          this.refreshTodos()
        }
      )
  }

  updateTodo(id){
    console.log(`Update Todo ${id}`)
    this.router.navigate(['todos',id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }

}
