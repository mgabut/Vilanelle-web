import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningPageComponent } from './joining.page.component';

describe('JoiningPageComponent', () => {
  let component: JoiningPageComponent;
  let fixture: ComponentFixture<JoiningPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoiningPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoiningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
