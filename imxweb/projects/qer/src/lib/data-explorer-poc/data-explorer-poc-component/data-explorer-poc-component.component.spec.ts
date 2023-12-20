import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorerPocComponentComponent } from './data-explorer-poc-component.component';

describe('DataExplorerPocComponentComponent', () => {
  let component: DataExplorerPocComponentComponent;
  let fixture: ComponentFixture<DataExplorerPocComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExplorerPocComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExplorerPocComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
