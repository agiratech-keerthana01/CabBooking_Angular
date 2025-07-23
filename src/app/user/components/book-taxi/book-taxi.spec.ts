import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTaxi } from './book-taxi';

describe('BookTaxi', () => {
  let component: BookTaxi;
  let fixture: ComponentFixture<BookTaxi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTaxi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTaxi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
