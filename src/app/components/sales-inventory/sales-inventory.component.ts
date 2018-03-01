import { Component, ViewChild, AfterViewInit, AfterContentInit, OnInit } from '@angular/core';
import { SalesInventService } from '../../services/sales-invent.service';
import { Sales } from '../../models/sales';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sales-inventory',
  templateUrl: './sales-inventory.component.html',
  styleUrls: ['./sales-inventory.component.css']
})
export class SalesInventoryComponent implements OnInit, AfterViewInit {
  SalesColumns = ['Date', 'Reference No', 'Customer', 'Payment', 'Balance', 'Sales Status', 'Actions'];
  sale: Sales[];
  total: number;

  sales = new Observable<Sales[]>();
  // totalsale = this.sale[Payment];
  dataSource = new SalesSource(this.saleServe);
  // dataS2 = new MatTableDataSource<Sales>(this.sale);
  dataS2 = new MatTableDataSource<Sales>(this.sale);
  // dataSource = new MatTableDataSource<Sales>(this.selsa);

  inSale: Sales = {
    Date: '',
    Actions: '',
    Balance: null,
    Customer: '',
    Payment: null,
    ReferenceNo: '',
    SalesStatus: ''
  };

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private saleServe: SalesInventService) { }


  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.sales = this.saleServe.getSalesData();
  }

  ngAfterViewInit() {
    this.sales = this.saleServe.getSalesData();
  }

  /*ngAfterContentInit() {
    this.saleServe.getSalesData().subscribe(sales => {
      console.log(sales);
      this.sale = sales;

    });

  }*/

  addSales() {
    this.saleServe.addSalesData(this.inSale);
  }

}

export class SalesSource extends DataSource<any> {
  constructor(private saleServe: SalesInventService) {
    super();
  }

  connect() {
    return this.saleServe.getSalesData();
  }
  disconnect() {

  }

}


