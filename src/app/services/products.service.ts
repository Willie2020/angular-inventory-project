import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Products } from '../models/productI';

@Injectable()
export class ProductsService {
  private products: Products[] = [
    { Name: 'Product 1', ProductPrice: 100, QuantityAv: 50, QuantityPch: 100, QuantitySld: 50 },
    { Name: 'Product 2', ProductPrice: 200, QuantityAv: 30, QuantityPch: 80, QuantitySld: 50 },
    { Name: 'Product 3', ProductPrice: 150, QuantityAv: 25, QuantityPch: 60, QuantitySld: 35 }
  ];

  constructor() {}

  addSalesData(productData: Products): Observable<Products> {
    this.products.push(productData);
    return of(productData);
  }

  getProducts(): Observable<Products[]> {
    return of(this.products);
  }

  updateProduct(index: number, product: Products): Observable<Products> {
    if (index >= 0 && index < this.products.length) {
      this.products[index] = product;
      return of(product);
    }
    throw new Error('Product not found');
  }

  deleteProduct(index: number): Observable<boolean> {
    if (index >= 0 && index < this.products.length) {
      this.products.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}

