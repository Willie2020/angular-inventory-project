import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatGridListModule, MatCardModule,
MatMenuModule, MatTableModule, MatListModule, MatDividerModule, MatSnackBarModule, MatPaginatorModule,
MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
// import { MatMomentDateModule } from '@angular/material/datepicker';







@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatGridListModule, MatCardModule, MatMenuModule,
    MatTableModule, MatListModule, MatDividerModule, MatSnackBarModule, MatPaginatorModule, MatFormFieldModule, FormsModule,
    MatDatepickerModule, MatNativeDateModule ],

    exports: [MatButtonModule, MatToolbarModule, MatInputModule, MatIconModule, MatGridListModule, MatCardModule, MatMenuModule,
    MatTableModule, MatListModule, MatDividerModule, MatSnackBarModule, MatPaginatorModule, MatFormFieldModule, FormsModule,
    MatDatepickerModule, MatNativeDateModule ]

})

export class MaterialModule {}
