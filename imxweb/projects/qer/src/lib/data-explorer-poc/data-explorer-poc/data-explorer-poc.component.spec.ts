import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorerPocComponent } from './data-explorer-poc.component';

describe('DataExplorerPocComponent', () => {
  let component: DataExplorerPocComponent;
  let fixture: ComponentFixture<DataExplorerPocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExplorerPocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExplorerPocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
