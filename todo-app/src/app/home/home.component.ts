import { Component, OnInit } from '@angular/core';
import { TodoItemService } from '../core/service/todo-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  header = 'ToDo-App';

  constructor(public todoItemService: TodoItemService) { }

  ngOnInit(): void {
  }

  createNewToDo() {
    this.todoItemService.newItem();
  }

}
