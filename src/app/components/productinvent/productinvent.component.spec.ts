import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductinventComponent } from './productinvent.component';

describe('ProductinventComponent', () => {
  let component: ProductinventComponent;
  let fixture: ComponentFixture<ProductinventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductinventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductinventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
