import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { NgForm } from '@angular/forms';
import { TodoService } from '../services/todo.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

	todos : Todo[];
	newTodo: Todo = new Todo();
  editing: boolean = false;
  editingTodo : Todo = new Todo();

  constructor(private todoService : TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  createForm(todoForm : NgForm) : void {
  	this.todoService.createTodo(this.newTodo)
    .subscribe(todoData => {
      todoForm.reset();
      this.newTodo = new Todo();
      this.todos.unshift(todoData);
    });
  }

  editTodo(todoData : any): void {
    this.editing = true;
    Object.assign(this.editingTodo, todoData);
  }

  deleteTodo(id: string) : void {
    this.todoService.deleteTodo(id)
    .subscribe(todoData => this.todos = this.todos.filter(todo => todo._id !== id))
  }

  updateTodo(todoData : any) : void {
    this.todoService.updateTodo(todoData)
    .subscribe(updatedData => {
      let existingTodo = this.todos.find(todo => todo._id === updatedData._id);
      Object.assign(existingTodo, updatedData);
      this.clearEditing();
    });
  }

  clearEditing() : void {
    this.editingTodo = new Todo();
    this.editing = false;
  }

}
