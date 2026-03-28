import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavuserSmartComponent } from './navuser.smart.component';

describe('NavuserSmartComponent', () => {
  let component: NavuserSmartComponent;
  let fixture: ComponentFixture<NavuserSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavuserSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavuserSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
