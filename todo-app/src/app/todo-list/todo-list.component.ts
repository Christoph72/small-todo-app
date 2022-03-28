import { ToDoItem } from './../core/models/ToDoItem';
import { Component, OnInit } from '@angular/core';
import { MoveDirection, TodoItemService } from '../core/service/todo-item.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {

  todoItems: ToDoItem[] = [];

  constructor(public todoItemService: TodoItemService) { }

  ngOnInit(): void {
    this.todoItems = this.todoItemService.todoItems;
    this.todoItemService.itemList$.subscribe(newItems => this.todoItems = newItems);
  }

  updateItem(item: ToDoItem) {
    this.todoItemService.updateItem(item).then(_ => console.log('Item updated'));
  }

  clickUp(id: string) {
    this.todoItemService.moveItem(id, MoveDirection.UP);
  }

  clickDown(id: string) {
    this.todoItemService.moveItem(id, MoveDirection.DOWN);
  }

  clickFinished(id: string) {
    this.todoItemService.removeItem(id);
  }

}
