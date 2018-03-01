import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableinventoryComponent } from './tableinventory.component';

describe('TableinventoryComponent', () => {
  let component: TableinventoryComponent;
  let fixture: ComponentFixture<TableinventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableinventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableinventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
