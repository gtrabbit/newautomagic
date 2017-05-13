import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeifsComponent } from './mergeifs.component';

describe('MergeifsComponent', () => {
  let component: MergeifsComponent;
  let fixture: ComponentFixture<MergeifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
