import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';







@NgModule({
    imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatGridListModule,
      MatCardModule,
      MatMenuModule,
      MatTableModule,
      MatListModule,
      MatDividerModule,
      MatSnackBarModule,
      MatPaginatorModule,
      MatFormFieldModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule
    ],
    exports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatInputModule,
      MatIconModule,
      MatGridListModule,
      MatCardModule,
      MatMenuModule,
      MatTableModule,
      MatListModule,
      MatDividerModule,
      MatSnackBarModule,
      MatPaginatorModule,
      MatFormFieldModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule
    ]
})

export class MaterialModule {}
