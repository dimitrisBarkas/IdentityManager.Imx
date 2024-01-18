import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSideSheetComponent } from './detail-side-sheet.component';

describe('DetailSideSheetComponent', () => {
  let component: DetailSideSheetComponent;
  let fixture: ComponentFixture<DetailSideSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSideSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSideSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
