export enum ItemStatus {
  INFO, WARNING, NONE
}

export interface ToDoItem {
  _id: string;

  index: number;

  message: string;

  due: number;

  status: ItemStatus.NONE;

  _rev?: string;
}
