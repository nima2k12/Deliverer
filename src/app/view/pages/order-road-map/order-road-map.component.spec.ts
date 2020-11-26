import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRoadMapComponent } from './order-road-map.component';

describe('OrderRoadMapComponent', () => {
  let component: OrderRoadMapComponent;
  let fixture: ComponentFixture<OrderRoadMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderRoadMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderRoadMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
