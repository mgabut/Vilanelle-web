import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDumbComponent } from './concert.dumb.component';

describe('ConcertDumbComponent', () => {
  let component: ConcertDumbComponent;
  let fixture: ComponentFixture<ConcertDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcertDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
