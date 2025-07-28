import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedTrips } from './completed-trips';

describe('CompletedTrips', () => {
  let component: CompletedTrips;
  let fixture: ComponentFixture<CompletedTrips>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTrips]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedTrips);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
