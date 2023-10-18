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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, selectedOptionKey: any, selectedOptionValue: any, totalRows: number },
    private dialogRef: MatDialogRef<ConfirmDialogComponent> // Inject MatDialogRef
  ) {}

  // Handle cancel button click
  onNoClick(): void {
    this.dialogRef.close(false); // Close the dialog with a result (false in this case)
  }

  ngOnInit(): void {
  }

}
  @ViewChild(CsvsyncComponent,{ static: false }) CsvsyncComponent: CsvsyncComponent;
  progressValue: number = 0;




  constructor(
    @Inject(MAT_DIALOG_DATA) public msg: any,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.updateProgress();
  }

  updateProgress() {

    const interval = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 10; 
      } else {
        clearInterval(interval); 
      }
    }, 1000); 
  }

    

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
