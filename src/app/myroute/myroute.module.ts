import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SalesInventoryComponent } from '../components/sales-inventory/sales-inventory.component';
import { TableinventoryComponent } from '../components/tableinventory/tableinventory.component';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProductinventComponent } from '../components/productinvent/productinvent.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

const routes: Routes =  [
  { path: 'Salestable', component: SalesInventoryComponent },
  { path: 'tableinvent', component: TableinventoryComponent },
  { path: 'products', component: ProductinventComponent },
  { path: '',  redirectTo: '/products', pathMatch: 'full'},
  // {path: 'home', component: AppComponent}
  // { path: '', component: FirstpgComponent}
];

@NgModule({
  imports: [HttpModule, HttpClientModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class MyrouteModule { }

// export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);





