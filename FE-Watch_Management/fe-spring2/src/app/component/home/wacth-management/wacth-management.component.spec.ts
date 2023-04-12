import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WacthManagementComponent } from './wacth-management.component';

describe('WacthManagementComponent', () => {
  let component: WacthManagementComponent;
  let fixture: ComponentFixture<WacthManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WacthManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WacthManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
