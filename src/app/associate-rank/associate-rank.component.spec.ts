import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateRankComponent } from './associate-rank.component';

describe('AssociateRankComponent', () => {
  let component: AssociateRankComponent;
  let fixture: ComponentFixture<AssociateRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
