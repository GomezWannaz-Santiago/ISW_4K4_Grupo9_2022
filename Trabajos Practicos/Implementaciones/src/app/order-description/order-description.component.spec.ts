import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDescriptionComponent } from './order-description.component';

describe('OrderDescriptionComponent', () => {
  let component: OrderDescriptionComponent;
  let fixture: ComponentFixture<OrderDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
