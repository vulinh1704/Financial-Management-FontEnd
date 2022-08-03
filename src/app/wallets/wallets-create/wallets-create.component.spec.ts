import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsCreateComponent } from './wallets-create.component';

describe('WalletsCreateComponent', () => {
  let component: WalletsCreateComponent;
  let fixture: ComponentFixture<WalletsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
