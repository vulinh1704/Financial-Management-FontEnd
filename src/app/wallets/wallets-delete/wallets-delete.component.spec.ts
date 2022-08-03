import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsDeleteComponent } from './wallets-delete.component';

describe('WalletsDeleteComponent', () => {
  let component: WalletsDeleteComponent;
  let fixture: ComponentFixture<WalletsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
