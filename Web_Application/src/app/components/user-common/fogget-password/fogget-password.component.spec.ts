import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoggetPasswordComponent } from './fogget-password.component';

describe('FoggetPasswordComponent', () => {
  let component: FoggetPasswordComponent;
  let fixture: ComponentFixture<FoggetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoggetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoggetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
