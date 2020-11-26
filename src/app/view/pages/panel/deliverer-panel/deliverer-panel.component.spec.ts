import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererPanelComponent } from './deliverer-panel.component';

describe('DelivererPanelComponent', () => {
  let component: DelivererPanelComponent;
  let fixture: ComponentFixture<DelivererPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelivererPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelivererPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
