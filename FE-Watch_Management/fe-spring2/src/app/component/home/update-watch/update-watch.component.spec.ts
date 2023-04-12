import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWatchComponent } from './update-watch.component';

describe('UpdateWatchComponent', () => {
  let component: UpdateWatchComponent;
  let fixture: ComponentFixture<UpdateWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
