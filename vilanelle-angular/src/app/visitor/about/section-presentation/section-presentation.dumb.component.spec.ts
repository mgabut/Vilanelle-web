import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionPresentationDumbComponent } from './section-presentation.dumb.component';

describe('SectionPresentationDumbComponent', () => {
  let component: SectionPresentationDumbComponent;
  let fixture: ComponentFixture<SectionPresentationDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionPresentationDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionPresentationDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
