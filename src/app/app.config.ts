import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MAT_ICON_DEFAULT_OPTIONS } from '@angular/material/icon';
import { NbThemeModule } from '@nebular/theme';
import { routes } from './app.routes';
import { ItemService } from './services/item.service';
import { SalesInventService } from './services/sales-invent.service';
import { ProductsService } from './services/products.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: MAT_ICON_DEFAULT_OPTIONS, useValue: { fontSet: 'material-symbols-outlined' } },
    // Nebular theme (corporate skin) — used together with the Material 3 design system
    importProvidersFrom(NbThemeModule.forRoot({ name: 'corporate' })),
    ItemService,
    SalesInventService,
    ProductsService
  ]
};
