import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentnameComponent } from './components/componentname/componentname.component';
import { FirstpgComponent } from './components/firstpg/firstpg.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ItemService } from './services/item.service';
import { TableinventoryComponent } from './components/tableinventory/tableinventory.component';
import { SalesInventService } from './services/sales-invent.service';
import { SalesInventoryComponent } from './components/sales-inventory/sales-inventory.component';
import { MyrouteModule} from './myroute/myroute.module';
import { ProductsService } from './services/products.service';
import { ProductinventComponent } from './components/productinvent/productinvent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ComponentnameComponent,
    FirstpgComponent,
    TableinventoryComponent,
    SalesInventoryComponent,
    ProductinventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MyrouteModule
  ],
  providers: [ItemService, SalesInventService, ProductsService],
  bootstrap: [AppComponent]
})

export class AppModule { }

