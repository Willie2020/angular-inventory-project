import { Routes } from '@angular/router';
import { SalesInventoryComponent } from './components/sales-inventory/sales-inventory.component';
import { TableinventoryComponent } from './components/tableinventory/tableinventory.component';
import { ProductinventComponent } from './components/productinvent/productinvent.component';

export const routes: Routes = [
  { path: 'sales', component: SalesInventoryComponent },
  { path: 'inventory', component: TableinventoryComponent },
  { path: 'products', component: ProductinventComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];
