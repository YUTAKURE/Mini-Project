import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todos: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.firestoreCollection.valueChanges().subscribe((item) => {
      this.todos = item;
    });
  }

  onClick(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement) {
    if (titleInput.value && descriptionInput.value) {
      this.todoService.addTodo(titleInput.value, descriptionInput.value);
      titleInput.value = '';
      descriptionInput.value = '';
    }

    setTimeout(() => {
      window.location.reload();
    }, 600);
  }
}
