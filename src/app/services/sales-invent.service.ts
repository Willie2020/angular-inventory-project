import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sales } from '../models/sales';

@Injectable()
export class SalesInventService {
  private sales: Sales[] = [
    { Date: '2025-01-01', Actions: 'Sale', Balance: 1000, Customer: 'John Doe', Payment: 500, ReferenceNo: 'REF001', SalesStatus: 'Completed' },
    { Date: '2025-01-02', Actions: 'Sale', Balance: 800, Customer: 'Jane Smith', Payment: 300, ReferenceNo: 'REF002', SalesStatus: 'Pending' },
    { Date: '2025-01-03', Actions: 'Return', Balance: 200, Customer: 'Bob Johnson', Payment: -100, ReferenceNo: 'REF003', SalesStatus: 'Returned' }
  ];

  constructor() {}

  addSalesData(salesData: Sales): Observable<Sales> {
    this.sales.push(salesData);
    console.log('Sales data added');
    return of(salesData);
  }

  getSalesData(): Observable<Sales[]> {
    return of(this.sales);
  }

  updateSalesData(index: number, salesData: Sales): Observable<Sales> {
    if (index >= 0 && index < this.sales.length) {
      this.sales[index] = salesData;
      return of(salesData);
    }
    throw new Error('Sales data not found');
  }

  deleteSalesData(index: number): Observable<boolean> {
    if (index >= 0 && index < this.sales.length) {
      this.sales.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}
