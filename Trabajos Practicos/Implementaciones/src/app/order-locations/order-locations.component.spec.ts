import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLocationsComponent } from './order-locations.component';

describe('OrderLocationsComponent', () => {
  let component: OrderLocationsComponent;
  let fixture: ComponentFixture<OrderLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
