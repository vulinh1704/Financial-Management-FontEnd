import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyTypeComponent } from './money-type.component';

describe('MoneyTypeComponent', () => {
  let component: MoneyTypeComponent;
  let fixture: ComponentFixture<MoneyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
