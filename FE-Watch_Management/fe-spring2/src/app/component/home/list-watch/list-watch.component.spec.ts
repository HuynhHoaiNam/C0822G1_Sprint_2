import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWatchComponent } from './list-watch.component';

describe('ListWatchComponent', () => {
  let component: ListWatchComponent;
  let fixture: ComponentFixture<ListWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
