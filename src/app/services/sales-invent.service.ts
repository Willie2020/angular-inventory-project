import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Sales } from '../models/sales';

@Injectable()
export class SalesInventService {
    SalesCaollection: AngularFirestoreCollection <Sales>;
    sales: Observable<Sales[]>;

  constructor(public afs: AngularFirestore ) {
    this.sales = this.afs.collection('Sales').valueChanges();
  }

  addSalesData(SalesData) {
    this.afs.collection('Sales').add(SalesData).then(() => {
      console.log('Done');
    });
  }

  getSalesData() {
    return this.sales;
  }

}
