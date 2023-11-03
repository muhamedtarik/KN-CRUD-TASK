import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditComponent } from '../add-edit/create-edit.component';
import { ViewComponent } from '../view/view.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'body',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public postService: PostService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data: Post[]) => {
      this.postService.posts = data;
      this.postService.postsLength=this.postService.posts.length;
      console.log(this.postService.postsLength)
      this.dataSource = new MatTableDataSource(this.postService.posts);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(data: any, type: string) {
    const dialogTypesComponents: any = {
      "view": ViewComponent,
      "add": CreateEditComponent,
      "edit": CreateEditComponent,
      "delete": DeleteComponent,
    }
    const dialogRef = this._dialog.open(dialogTypesComponents[type], {
      width: '500px',
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.dataSource = new MatTableDataSource(this.postService.posts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

}