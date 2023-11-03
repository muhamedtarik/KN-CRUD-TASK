import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostService } from '../post.service';
import { CoreService } from '../../core/core.service';
@Component({
  selector: 'app-create',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.scss']
})
export class CreateEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    public postService: PostService,
    private _dialogRef: MatDialogRef<CreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.form = this._fb.group({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data)
  }

  submit() {

    if (this.data) {
      /* Edit Post */
      console.log(this.data)
      this.postService.update(this.data.id, this.form.value).subscribe(res => {
        let selectedPost = this.postService.posts.findIndex((item => item.id == this.data.id));
        this.postService.posts[selectedPost] = res;
        this._coreService.openSnackBar('User Updated successfully');
        this._dialogRef.close(true);
      })
    } else {
      /* Add New Post */
      this.postService.create(this.form.value).subscribe(res => {
        this.postService.posts.push(res)
        this._coreService.openSnackBar('User Added successfully');
        this._dialogRef.close(true);
      })
    }


  }

}