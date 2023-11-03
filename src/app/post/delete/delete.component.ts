import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { Post } from '../post';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(
    public postService: PostService,
    private _dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) { }

  deletePost() {
    this.postService.delete(this.data.id).subscribe(res => {
      this.postService.posts = this.postService.posts.filter(item => item.id !== this.data.id);
      this._coreService.openSnackBar('User Deleted successfully');
      this._dialogRef.close(true);
    })
  }
}
