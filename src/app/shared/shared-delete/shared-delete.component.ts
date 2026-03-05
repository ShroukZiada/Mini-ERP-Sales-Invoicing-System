import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shared-delete',
  standalone: true,
  imports: [],
  templateUrl: './shared-delete.component.html',
  styleUrl: './shared-delete.component.css'
})
export class SharedDeleteComponent {

  constructor(public dialogRef: MatDialogRef<SharedDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  confirmDelete() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }

}
