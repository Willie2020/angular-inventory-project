import { Component, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/productI';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-productinvent',
  templateUrl: './productinvent.component.html',
  styleUrls: ['./productinvent.component.css']
})
export class ProductinventComponent implements AfterViewInit {

  ProductColumns = ['Name', 'Product', 'Quantity Available', 'Quantity Purchased',
    'Quantity Sold'];


  dataSource = new ProductList(this.ProductServe);
  products = new Observable<Products[]>();

  product: Products[];

  prod: Products = {
    Name: '',
    ProductPrice: null,
    QuantityPch: null,
    QuantityAv: null,
    QuantitySld: null

  };

  constructor(public ProductServe: ProductsService) { }

  ngAfterViewInit() {
    this.products = this.ProductServe.getProducts();
  }

  addProduct() {
     this.ProductServe.addSalesData(this.prod);
  }

}

export class ProductList extends DataSource<any> {
  constructor(private podServe: ProductsService) {
    super();
  }

  connect() {
    return this.podServe.getProducts();

  }
  disconnect() {

  }
}
