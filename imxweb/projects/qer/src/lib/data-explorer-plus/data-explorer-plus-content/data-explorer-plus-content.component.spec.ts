import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorerPlusContentComponent } from './data-explorer-plus-content.component';

describe('DataExplorerPlusContentComponent', () => {
  let component: DataExplorerPlusContentComponent;
  let fixture: ComponentFixture<DataExplorerPlusContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExplorerPlusContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExplorerPlusContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
