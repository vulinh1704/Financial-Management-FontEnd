import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWalletComponent } from './detail-wallet.component';

describe('DetailWalletComponent', () => {
  let component: DetailWalletComponent;
  let fixture: ComponentFixture<DetailWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailWalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
