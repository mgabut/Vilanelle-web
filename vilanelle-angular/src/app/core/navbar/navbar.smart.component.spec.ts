import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSmartComponent } from './navbar.smart.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('NavbarSmartComponent', () => {
  let component: NavbarSmartComponent;
  let fixture: ComponentFixture<NavbarSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarSmartComponent],
      providers: [
        {
        provide: ActivatedRoute,
        useValue: { params: of({ id: '123' }) }
        }
      ]  
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
