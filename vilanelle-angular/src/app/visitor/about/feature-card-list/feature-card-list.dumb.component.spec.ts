import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCardListDumbComponent } from './feature-card-list.dumb.component';
import { DebugElement } from '@angular/core';
import { FeatureCardList } from './feature-card-list.interface';
import { By } from '@angular/platform-browser';

describe('FeatureCardListDumbComponent', () => {
  let component: FeatureCardListDumbComponent;
  let fixture: ComponentFixture<FeatureCardListDumbComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cardList: DebugElement[];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let cardTitleList: DebugElement[];

  const featureCardList: FeatureCardList = [
    { name: 'Feature 1',  icon: 'icon 1', description: 'Description 1'},
    { name: 'Feature 2', icon: 'icon 2', description: 'Description 2'},
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureCardListDumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCardListDumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('featureCardList', featureCardList);
    fixture.detectChanges();
  });

  beforeEach(() => {
    cardList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card"]')
    );
    cardTitleList = fixture.debugElement.queryAll(
      By.css('[data-testid="feature-card-title"]')
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
