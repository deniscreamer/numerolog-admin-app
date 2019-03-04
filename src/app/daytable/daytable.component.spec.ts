import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaytablePage } from './daytable.page';

describe('DaytablePage', () => {
  let component: DaytablePage;
  let fixture: ComponentFixture<DaytablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaytablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaytablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
