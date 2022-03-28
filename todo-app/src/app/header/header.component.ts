import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input()
  currentTitle = '';

  @Output()
  newTodo = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
