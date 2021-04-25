import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import {TODO_API_JPA_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(private http: HttpClient) { }

  getAllTodos(username: string){
    return this.http.get<Todo[]>(`${TODO_API_JPA_URL}/users/${username}/todos`);
  }

  deleteTodo(username, id){
    return this.http.delete(`${TODO_API_JPA_URL}/users/${username}/todos/${id}`); 
  }

  retrieveTodo(username, id){
    return this.http.get<Todo>(`${TODO_API_JPA_URL}/users/${username}/todos/${id}`); 
  }

  updateTodo(username, id, todo){
    return this.http.put(`${TODO_API_JPA_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo){
    return this.http.post(`${TODO_API_JPA_URL}/users/${username}/todos`, todo);
  }
}
