import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalesInventoryComponent } from '../components/sales-inventory/sales-inventory.component';
import { TableinventoryComponent } from '../components/tableinventory/tableinventory.component';
import { ProductinventComponent } from '../components/productinvent/productinvent.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: 'sales', component: SalesInventoryComponent },
  { path: 'inventory', component: TableinventoryComponent },
  { path: 'products', component: ProductinventComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MyrouteModule { }





