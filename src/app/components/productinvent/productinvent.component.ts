import { Component, AfterViewInit } from '@angular/core';
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
    MatTableModule
  ]
})
export class ProductinventComponent implements AfterViewInit {

  ProductColumns = ['Name', 'ProductPrice', 'QuantityAv', 'QuantityPch', 'QuantitySld'];

  dataSource = new ProductList(this.ProductServe);
  products$: Observable<Products[]>;
  product: Products[];
  
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
