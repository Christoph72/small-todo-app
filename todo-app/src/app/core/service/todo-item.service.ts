import { DatabaseService } from './database.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemStatus, ToDoItem } from '../models/ToDoItem';
import { UUIDGenerator } from '../util/uuid-helper';

export enum MoveDirection {
  UP, DOWN
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  todoItems: ToDoItem[] = [];

  itemList$ = new Subject<ToDoItem[]>();

  constructor(protected databaseService: DatabaseService) { }

  initialize() {
    this.databaseService.changed$.subscribe(_ => this.databaseService.getAllTodos().then(list => {
      this.todoItems = list;
      this.itemList$.next(list);
    }))
  }

  moveItem(id: string, move: MoveDirection) {
    const index = this.todoItems.findIndex(item => item._id == id);
    const swapIndex = move == MoveDirection.DOWN ? index + 1 : index - 1;
    [ this.todoItems[index], this.todoItems[swapIndex] ] = [ this.todoItems[swapIndex], this.todoItems[index] ]
    this.itemList$.next(this.todoItems);
  }

  removeItem(id: string) {
    this.todoItems = this.todoItems.filter(item => item._id != id);
    this.itemList$.next(this.todoItems);
  }

  updateItem(item: ToDoItem) {
    return this.databaseService.updateItem(item);
  }

  newItem() {
    const newToDo = {
      _id: UUIDGenerator.generateUUID(),
      index: -1,
      message: '',
      due: new Date().getTime(),
      status: ItemStatus.NONE
    } as ToDoItem;
    this.todoItems = [newToDo, ...this.todoItems];
    for (let i=0; i<this.todoItems.length;i++) {
      this.todoItems[i].index = i;
    }
    this.itemList$.next(this.todoItems);
  }
}
