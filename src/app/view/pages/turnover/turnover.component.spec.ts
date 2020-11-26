import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoverComponent } from './turnover.component';

describe('TurnoverComponent', () => {
  let component: TurnoverComponent;
  let fixture: ComponentFixture<TurnoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
