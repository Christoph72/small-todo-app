import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToDoItem } from '../models/ToDoItem';
import { UUIDGenerator } from '../util/uuid-helper';

export enum MoveDirection {
  UP, DOWN
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  todoItems: ToDoItem[] = [
    {
      id: UUIDGenerator.generateUUID(),
      index: 0,
      message: 'Dies ist die erste Nachticht'
    },
    {
      id: UUIDGenerator.generateUUID(),
      index: 1,
      message: 'Dies ist noch eine Nachticht'
    },
    {
      id: UUIDGenerator.generateUUID(),
      index: 2,
      message: 'Dies ist eine weitere Nachticht'
    },
  ];

  itemList$ = new Subject<ToDoItem[]>();

  constructor() { }

  moveItem(id: string, move: MoveDirection) {
    const index = this.todoItems.findIndex(item => item.id == id);
    const swapIndex = move == MoveDirection.DOWN ? index + 1 : index - 1;
    [ this.todoItems[index], this.todoItems[swapIndex] ] = [ this.todoItems[swapIndex], this.todoItems[index] ]
    this.itemList$.next(this.todoItems);
  }

  removeItem(id: string) {
    this.todoItems = this.todoItems.filter(item => item.id != id);
    this.itemList$.next(this.todoItems);
  }
}
