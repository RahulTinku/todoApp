import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Todo } from '../shared/todo';
import { Observable } from 'rxjs/observable';
import  'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable() 
export class TodoService {
	
	private baseUrl = 'http://localhost:8080';

	constructor(public http : Http){ }

	getTodos(): Observable<any>{
		return this.http.get(this.baseUrl + '/api/todos')
			.map((response: Response) => <any>response.json())
			.catch(this.handleError);
	}

	createTodo(todoData : any): Observable<any> {
		let body = JSON.stringify(todoData);
		let headers = new Headers({'content-type' : 'application/json'});
		let options = new RequestOptions({ headers : headers});

		return this.http.post(this.baseUrl + '/api/todo', body, options)
			.map((response : Response) => <any>response.json())
			.catch(this.handleError);
	}

	deleteTodo(id : string) : Observable<any> {
		return this.http.delete(this.baseUrl + '/api/todo/' + id)
			.map((response : Response) => <any>response.json())
			.catch(this.handleError);
	}

	updateTodo(todoData : any) : Observable<any> {
		let body = JSON.stringify(todoData);
		let headers = new Headers({'content-type': 'application/json'});
		let options = new RequestOptions({headers: headers});

		return this.http.put(this.baseUrl + '/api/todo/' + todoData._id, body, options)
		.map((response : Response) => <any>response.json())
		.catch(this.handleError);
	}

	private handleError(error: Response | any) {
		console.log(error);
		return Observable.throw(error.json().error || 'server error');
	}

}