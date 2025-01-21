import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from '../models/Items';

@Injectable()
export class ItemService {
  constructor(private firestore: Firestore) {}

  getItems(): Observable<Item[]> {
    const itemsCollection = collection(this.firestore, 'items');
    return collectionData(itemsCollection) as Observable<Item[]>;
  }
}

<!-- Remove deprecated *-syntax where possible -->
<ng-container>
  <mat-header-cell> Date </mat-header-cell>
  <mat-cell> {{sale.Date}} </mat-cell>
</ng-container>

<!-- Use @for instead of *ngFor -->
@for (sale of sales; track sale.id) {
  <div>{{sale.name}}</div>
}
