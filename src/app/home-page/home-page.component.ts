import { Component, OnInit, Inject } from '@angular/core';
import { NytService } from '../nyt.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  published_date: Date;
  multimedia: any[];
  abstract: string;
  byline: string;
  url: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  results: any[] = [];
  selectedSection: string = 'science';
  selected: {};
  
  constructor(
    private nytService: NytService,
    public dialog: MatDialog
  ) { }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      data: this.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selected = {};
    });
  }
  
  ngOnInit() {
    this.getArticles();
  }
  
  getArticles() {
    this.nytService.getArticles(this.selectedSection)
      .subscribe(res => {
        this.results = (res as any).results;
      })
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})

export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}