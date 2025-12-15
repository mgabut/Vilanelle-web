import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesPageComponent } from './pictures.page.component';

describe('PicturesPageComponent', () => {
  let component: PicturesPageComponent;
  let fixture: ComponentFixture<PicturesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PicturesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicturesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
