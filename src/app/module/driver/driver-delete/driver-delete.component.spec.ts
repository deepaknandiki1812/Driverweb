import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDeleteComponent } from './driver-delete.component';

describe('DriverDeleteComponent', () => {
  let component: DriverDeleteComponent;
  let fixture: ComponentFixture<DriverDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
