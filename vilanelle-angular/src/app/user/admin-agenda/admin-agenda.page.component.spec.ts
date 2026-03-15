import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAgendaPageComponent } from './admin-agenda.page.component';

describe('AdminAgendaPageComponent', () => {
  let component: AdminAgendaPageComponent;
  let fixture: ComponentFixture<AdminAgendaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAgendaPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAgendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
