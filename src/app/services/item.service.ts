import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../models/Items';

@Injectable()
export class ItemService {
  private items: Item[] = [
    { id: '1', title: 'Sample Item 1', description: 'This is a sample item for demonstration' },
    { id: '2', title: 'Sample Item 2', description: 'Another sample item' },
    { id: '3', title: 'Sample Item 3', description: 'Third sample item' }
  ];

  constructor() {}

  getItems(): Observable<Item[]> {
    return of(this.items);
  }

  addItem(item: Item): Observable<Item> {
    const newItem = { ...item, id: Date.now().toString() };
    this.items.push(newItem);
    return of(newItem);
  }

  updateItem(id: string, item: Partial<Item>): Observable<Item> {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...item };
      return of(this.items[index]);
    }
    throw new Error('Item not found');
  }

  deleteItem(id: string): Observable<boolean> {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}

