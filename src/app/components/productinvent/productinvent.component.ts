import { Component, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/productI';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-productinvent',
  templateUrl: './productinvent.component.html',
  styleUrls: ['./productinvent.component.css']
})
export class ProductinventComponent implements AfterViewInit {

  ProductColumns = ['Name', 'ProductPrice', 'QuantityAv', 'QuantityPch', 'QuantitySld'];

  dataSource = new ProductList(this.ProductServe);
  products$: Observable<Products[]>;
  product: Products[];

  prod: Products = {
    Name: '',
    ProductPrice: 0,
    QuantityPch: 0,
    QuantityAv: 0,
    QuantitySld: 0
  };

  constructor(public ProductServe: ProductsService) { 
    this.products$ = this.ProductServe.getProducts();
  }

  ngAfterViewInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.ProductServe.getProducts();
    this.products$.subscribe(products => {
      this.product = products;
    });
  }

  addProduct() {
    if (this.prod.Name && this.prod.ProductPrice > 0) {
      this.ProductServe.addSalesData(this.prod).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.prod = {
      Name: '',
      ProductPrice: 0,
      QuantityPch: 0,
      QuantityAv: 0,
      QuantitySld: 0
    };
  }
}

export class ProductList extends DataSource<Products> {
  constructor(private prodServe: ProductsService) {
    super();
  }

  connect(): Observable<Products[]> {
    return this.prodServe.getProducts();
  }

  disconnect() {
    // Cleanup logic if needed
  }
}
