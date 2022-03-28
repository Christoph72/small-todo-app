import { ToDoItem } from './../models/ToDoItem';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  static DBNAME = 'todoitems';

  public changed$ = new Subject<boolean>();

  private offlineDb: PouchDB.Database<ToDoItem>;
  private onlineDb: PouchDB.Database<ToDoItem>;

  constructor() { }

  initialize() {
    this.offlineDb = new PouchDB<ToDoItem>(DatabaseService.DBNAME)
    this.onlineDb = new PouchDB<ToDoItem>(`http://192.168.178.104:5984/${DatabaseService.DBNAME}`);

    this.offlineDb.sync(this.onlineDb, {
      push: {
        live: true,
        retry: true,
        heartbeat: 5000
      },
      pull: {
        live: true,
        retry: true,
        heartbeat: 5000
      },
    }).on('change', this.emitNewChanges
    ).on('error', err => console.log('sync error', err));
  }

  addNewItem(item: ToDoItem) {
    return this.offlineDb.put(item).then(resp => console.log(resp)).catch(err => console.log(err));
  }

  updateItem(item: ToDoItem) {
    return this.offlineDb.get(item._id).then(doc => this._updateDoc(item, doc))
  }

  getAllTodos() {
    return this.offlineDb.allDocs({include_docs: true})
        .then(response => {
          if (!response.rows) {
            console.log('No rows available');
            return [] as ToDoItem[];
          }
          return response.rows.filter(row => !row.value.deleted).map(row => row.doc).sort( (itemA, itemB) => itemA.index - itemB.index )
        })
        .catch(err => {
          console.error(err);
          return [] as ToDoItem[];
        })
  }

  private emitNewChanges(change: PouchDB.Replication.SyncResult<{}>) {
    console.log('data change', change);
    this.changed$.next(true);
  }

  private _updateDoc(item: ToDoItem, doc: PouchDB.Core.IdMeta & PouchDB.Core.GetMeta) {
    const newDoc = {
      ...item,
      _rev: doc._rev
    } as ToDoItem;
    console.log('Try to update doc: ' + item._id)
    return this.offlineDb.put(newDoc).then(resp => console.log(resp)).catch(err => console.log(err));
  }
}
