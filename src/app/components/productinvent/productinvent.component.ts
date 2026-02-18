import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../models/productI';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productinvent',
  templateUrl: './productinvent.component.html',
  styleUrls: ['./productinvent.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule
  ]
})
export class ProductinventComponent implements AfterViewInit, OnInit {

  ProductColumns = ['Name', 'ProductPrice', 'QuantityAv', 'QuantityPch', 'QuantitySld'];

  dataSource = new ProductList(this.ProductServe);
  products$: Observable<Products[]>;
  product: Products[] = [];

  totalProducts = 0;
  totalValue = 0;
  totalAvailable = 0;

  productForm: FormGroup;

  constructor(public ProductServe: ProductsService, private fb: FormBuilder) {
    this.products$ = this.ProductServe.getProducts();
    this.productForm = this.fb.group({
      Name: [''],
      ProductPrice: [0],
      QuantityPch: [0],
      QuantityAv: [0],
      QuantitySld: [0]
    });
  }

  ngOnInit() {
    this.loadProducts();
  }

  ngAfterViewInit() {
    // View initialized
  }

  loadProducts() {
    this.products$ = this.ProductServe.getProducts();
    this.products$.subscribe(products => {
      this.product = products;
      this.computeStats();
    });
  }

  computeStats() {
    this.totalProducts = this.product.length;
    this.totalValue = this.product.reduce((s, p) => s + (p.ProductPrice || 0) * (p.QuantityAv || 0), 0);
    this.totalAvailable = this.product.reduce((s, p) => s + (p.QuantityAv || 0), 0);
  }

  addProduct() {
    const formValue = this.productForm.value;
    if (formValue.Name && formValue.ProductPrice > 0) {
      this.ProductServe.addSalesData(formValue).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.productForm.reset({
      Name: '',
      ProductPrice: 0,
      QuantityPch: 0,
      QuantityAv: 0,
      QuantitySld: 0
    });
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
