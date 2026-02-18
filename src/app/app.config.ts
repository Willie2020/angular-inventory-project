import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { ItemService } from './services/item.service';
import { SalesInventService } from './services/sales-invent.service';
import { ProductsService } from './services/products.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    ItemService,
    SalesInventService,
    ProductsService
  ]
};
