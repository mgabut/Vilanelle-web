import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScoresPageComponent } from './admin-scores.page.component';

describe('AdminScoresPageComponent', () => {
  let component: AdminScoresPageComponent;
  let fixture: ComponentFixture<AdminScoresPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminScoresPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminScoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
