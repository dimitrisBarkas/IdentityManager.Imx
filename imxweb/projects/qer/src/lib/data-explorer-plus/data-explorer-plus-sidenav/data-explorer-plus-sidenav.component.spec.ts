import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorerPlusSidenavComponent } from './data-explorer-plus-sidenav.component';

describe('DataExplorerPlusSidenavComponent', () => {
  let component: DataExplorerPlusSidenavComponent;
  let fixture: ComponentFixture<DataExplorerPlusSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataExplorerPlusSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataExplorerPlusSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
