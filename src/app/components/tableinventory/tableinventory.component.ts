import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Items';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NbCardModule, NbBadgeModule } from '@nebular/theme';

@Component({
  selector: 'app-tableinventory',
  templateUrl: './tableinventory.component.html',
  styleUrls: ['./tableinventory.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    NbCardModule,
    NbBadgeModule
  ]
})
export class TableinventoryComponent implements OnInit {
  inventoryColumns = ['id', 'title', 'description', 'actions'];
  item: Item[] = [];
  items$: Observable<Item[]>;
  dataSource = new InventorySource(this.itemService);

  newItem = { title: '', description: '' };
  itemForm: FormGroup;

  constructor(private itemService: ItemService, private fb: FormBuilder) {
    this.items$ = this.itemService.getItems();
    this.itemForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.items$ = this.itemService.getItems();
    this.items$.subscribe(items => {
      this.item = items;
    });
  }

  get describedCoverage(): number {
    if (!this.item.length) {
      return 0;
    }
    const described = this.item.filter(i => i.description && i.description.trim()).length;
    return Math.round((described / this.item.length) * 100);
  }

  addItem() {
    if (this.newItem.title && this.newItem.description) {
      this.itemService.addItem(this.newItem).subscribe(() => {
        this.loadItems();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.newItem = { title: '', description: '' };
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems();
    });
  }
}

export class InventorySource extends DataSource<Item> {
  constructor(private itemService: ItemService) {
    super();
  }

  connect(): Observable<Item[]> {
    return this.itemService.getItems();
  }

  disconnect() {
    // Cleanup logic if needed
  }
}
