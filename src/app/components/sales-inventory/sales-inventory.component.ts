import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SalesInventService } from '../../services/sales-invent.service';
import { Sales } from '../../models/sales';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NbCardModule, NbBadgeModule, NbTagModule } from '@nebular/theme';

@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    NbCardModule,
    NbBadgeModule,
    NbTagModule
  ]
})
export class SalesInventoryComponent implements OnInit, AfterViewInit {
  SalesColumns = ['Date', 'Reference No', 'Customer', 'Sales Status', 'Payment', 'Balance', 'Actions'];
  sale: Sales[] = [];
  total = 0;

  sales$: Observable<Sales[]>;
  dataS2 = new MatTableDataSource<Sales>(this.sale);

  inSaleForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private saleServe: SalesInventService, private fb: FormBuilder) { 
    this.sales$ = this.saleServe.getSalesData();
    this.inSaleForm = this.fb.group({
      Date: [''],
      ReferenceNo: [''],
      Customer: [''],
      SalesStatus: [''],
      Payment: [0],
      Balance: [0],
      Actions: ['']
    });
  }

  ngOnInit() {
    this.loadSales();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataS2.paginator = this.paginator;
    }
  }

  loadSales() {
    this.sales$ = this.saleServe.getSalesData();
    this.sales$.subscribe(sales => {
      this.sale = sales;
      this.dataS2.data = sales;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.sale.reduce((sum, sale) => sum + (sale.Payment || 0), 0);
  }

  get totalBalance(): number {
    return this.sale.reduce((sum, sale) => sum + (sale.Balance || 0), 0);
  }

  statusOf(s: string): 'success' | 'warning' | 'info' | 'danger' {
    const v = (s || '').toLowerCase();
    if (v.includes('complete') || v.includes('paid') || v.includes('done')) {
      return 'success';
    }
    if (v.includes('pending') || v.includes('await')) {
      return 'warning';
    }
    if (v.includes('cancel') || v.includes('return') || v.includes('refund')) {
      return 'danger';
    }
    return 'info';
  }

  addSales() {
    const formValue = this.inSaleForm.value;
    if (formValue.Customer && formValue.Payment) {
      // Generate reference number if not provided
      if (!formValue.ReferenceNo) {
        formValue.ReferenceNo = 'REF' + Date.now().toString().slice(-6);
      }
      
      // Set current date if not provided
      if (!formValue.Date) {
        formValue.Date = new Date().toISOString().split('T')[0];
      }

      this.saleServe.addSalesData(formValue).subscribe(() => {
        this.loadSales();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.inSaleForm.reset({
      Date: '',
      ReferenceNo: '',
      Customer: '',
      SalesStatus: '',
      Payment: 0,
      Balance: 0,
      Actions: ''
    });
  }
}
