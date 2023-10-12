import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef  } from '@angular/material/dialog';
import { CsvsyncComponent } from '../csvsync.component';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'imx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  @ViewChild(CsvsyncComponent,{ static: false }) CsvsyncComponent: CsvsyncComponent;




  constructor(
    @Inject(MAT_DIALOG_DATA) public msg: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  ngOnInit(): void {
   
  }

    

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}