import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRankingComponent } from './display-ranking.component';

describe('DisplayRankingComponent', () => {
  let component: DisplayRankingComponent;
  let fixture: ComponentFixture<DisplayRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
