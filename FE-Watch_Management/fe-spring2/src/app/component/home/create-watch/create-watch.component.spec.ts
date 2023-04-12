import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWatchComponent } from './create-watch.component';

describe('CreateWatchComponent', () => {
  let component: CreateWatchComponent;
  let fixture: ComponentFixture<CreateWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
