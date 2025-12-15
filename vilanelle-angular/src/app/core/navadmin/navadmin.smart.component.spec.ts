import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavadminSmartComponent } from './navadmin.smart.component';

describe('NavadminSmartComponent', () => {
  let component: NavadminSmartComponent;
  let fixture: ComponentFixture<NavadminSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavadminSmartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavadminSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
