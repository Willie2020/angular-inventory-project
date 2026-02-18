import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Items';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-tableinventory',
  templateUrl: './tableinventory.component.html',
  styleUrls: ['./tableinventory.component.css'],
  imports: [CommonModule, FormsModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class TableinventoryComponent implements OnInit, AfterViewInit {
  inventoryColumns = ['id', 'title', 'description', 'actions'];
  item: Item[] = [];
  items$: Observable<Item[]>;
  dataSource = new InventorySource(this.itemService);

  newItem: Item = {
    title: '',
    description: ''
  };

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.getItems();
  }

  ngOnInit() {
    this.loadItems();
  }

  ngAfterViewInit() {
    console.log('Table inventory component initialized');
  }

  loadItems() {
    this.items$ = this.itemService.getItems();
    this.items$.subscribe(items => {
      this.item = items;
    });
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
    this.newItem = {
      title: '',
      description: ''
    };
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


