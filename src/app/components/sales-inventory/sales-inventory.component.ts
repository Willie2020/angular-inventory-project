import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SalesInventService } from '../../services/sales-invent.service';
import { Sales } from '../../models/sales';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css'],
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatPaginatorModule, MatIconModule,
    MatCardModule, MatDividerModule, MatSelectModule
  ]
})
export class SalesInventoryComponent implements OnInit, AfterViewInit {
  SalesColumns = ['Date', 'ReferenceNo', 'Customer', 'Payment', 'Balance', 'SalesStatus', 'Actions'];
  sale: Sales[] = [];
  total = 0;
  completedCount = 0;

  salesStatusOptions = ['Completed', 'Pending', 'Processing', 'Returned', 'Cancelled'];

  sales$: Observable<Sales[]>;
  dataSource = new SalesSource(this.saleServe);
  dataS2 = new MatTableDataSource<Sales>(this.sale);

  inSale: Sales = {
    Date: '',
    Actions: '',
    Balance: 0,
    Customer: '',
    Payment: 0,
    ReferenceNo: '',
    SalesStatus: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private saleServe: SalesInventService) {
    this.sales$ = this.saleServe.getSalesData();
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
    this.completedCount = this.sale.filter(s => this.normalizeStatus(s.SalesStatus) === 'completed').length;
  }

  normalizeStatus(status: string): string {
    return status?.toLowerCase() ?? '';
  }

  getStatusClass(status: string): string {
    const s = this.normalizeStatus(status);
    if (!s) return 'default';
    if (s === 'completed') return 'completed';
    if (s === 'pending' || s === 'processing') return 'pending';
    if (s === 'returned' || s === 'cancelled') return 'returned';
    return 'default';
  }

  addSales() {
    if (this.inSale.Customer && this.inSale.Payment) {
      if (!this.inSale.ReferenceNo) {
        this.inSale.ReferenceNo = 'REF' + Date.now().toString().slice(-6);
      }
      if (!this.inSale.Date) {
        this.inSale.Date = new Date().toISOString().split('T')[0];
      }

      this.saleServe.addSalesData(this.inSale).subscribe(() => {
        this.loadSales();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.inSale = {
      Date: '',
      Actions: '',
      Balance: 0,
      Customer: '',
      Payment: 0,
      ReferenceNo: '',
      SalesStatus: ''
    };
  }
}

export class SalesSource extends DataSource<Sales> {
  constructor(private saleServe: SalesInventService) {
    super();
  }

  connect(): Observable<Sales[]> {
    return this.saleServe.getSalesData();
  }

  disconnect() {
    // Cleanup logic if needed
  }
}
