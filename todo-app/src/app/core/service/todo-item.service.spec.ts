import { TestBed } from '@angular/core/testing';

import { TodoItemService } from './todo-item.service';

describe('TodoItemServiceService', () => {
  let service: TodoItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
