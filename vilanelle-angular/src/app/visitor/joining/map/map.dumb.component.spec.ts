import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDumbComponent } from './map.dumb.component';

describe('MapDumbComponent', () => {
  let component: MapDumbComponent;
  let fixture: ComponentFixture<MapDumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapDumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
