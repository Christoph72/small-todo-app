import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  @Input()
  showBackButton = false;

  @Input()
  currentTitle = '';

  @Input()
  showHistoryNav = false;

  constructor() { }

  ngOnInit(): void {
  }

}
