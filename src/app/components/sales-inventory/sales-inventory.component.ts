import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { SalesInventService } from '../../services/sales-invent.service';
import { Sales } from '../../models/sales';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css']
})
export class SalesInventoryComponent implements OnInit, AfterViewInit {
  SalesColumns = ['Date', 'ReferenceNo', 'Customer', 'Payment', 'Balance', 'SalesStatus', 'Actions'];
  sale: Sales[] = [];
  total = 0;

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
  }

  addSales() {
    if (this.inSale.Customer && this.inSale.Payment) {
      // Generate reference number if not provided
      if (!this.inSale.ReferenceNo) {
        this.inSale.ReferenceNo = 'REF' + Date.now().toString().slice(-6);
      }
      
      // Set current date if not provided
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


