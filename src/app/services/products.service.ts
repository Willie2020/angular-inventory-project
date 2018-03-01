import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Products } from '../models/productI';


@Injectable()
export class ProductsService {

  ProductData: AngularFirestoreCollection<Products>;
  products: Observable<Products[]>;

  constructor(public newfs: AngularFirestore) {
    this.products = this.newfs.collection('Products').valueChanges();
  }


  addSalesData(ProductData) {
    this.newfs.collection('Products').add(ProductData);
  }

  getProducts() {
    return this.products;
  }
}

