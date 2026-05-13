import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Items';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tableinventory',
  templateUrl: './tableinventory.component.html',
  styleUrls: ['./tableinventory.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class TableinventoryComponent implements OnInit {
  inventoryColumns = ['id', 'title', 'description'];
  item: Item[] = [];
  items$: Observable<Item[]>;
  dataSource = new InventorySource(this.itemService);

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

  addItem() {
    const formValue = this.itemForm.value;
    if (formValue.title && formValue.description) {
      this.itemService.addItem(formValue).subscribe(() => {
        this.loadItems();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.itemForm.reset({
      title: '',
      description: ''
    });
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
