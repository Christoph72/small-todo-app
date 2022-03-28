import { ToDoItem } from './../../core/models/ToDoItem';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.less']
})
export class TodoListItemComponent implements OnInit {

  inEditMode = false;

  @Input()
  todoItem!: ToDoItem;

  @Input()
  first!: boolean;

  @Input()
  last!: boolean;

  @Output()
  down = new EventEmitter<string>();

  @Output()
  up = new EventEmitter<string>();

  @Output()
  finish = new EventEmitter<string>();

  @Output()
  updated = new EventEmitter<ToDoItem>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleEdit() {
    console.log('MODEL', JSON.stringify(this.todoItem));
    this.inEditMode = !this.inEditMode;
    if (!this.inEditMode) {
      this.updated.emit(this.todoItem);
    }
  }

}
