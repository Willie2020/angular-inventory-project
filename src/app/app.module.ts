import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentnameComponent } from './components/componentname/componentname.component';
import { FirstpgComponent } from './components/firstpg/firstpg.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { environment} from '../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ItemService } from './services/item.service';
import { TableinventoryComponent } from './components/tableinventory/tableinventory.component';
import { SalesInventService } from './services/sales-invent.service';
import { SalesInventoryComponent } from './components/sales-inventory/sales-inventory.component';
import { RouterModule, Routes, Router } from '@angular/router';
import { MyrouteModule} from './myroute/myroute.module';
import { ProductsService } from './services/products.service';
import { ProductinventComponent } from './components/productinvent/productinvent.component';
import {enableProdMode} from '@angular/core';




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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    MyrouteModule
  ],
  providers: [ItemService, SalesInventService, ProductsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
