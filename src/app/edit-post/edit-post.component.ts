import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PostItem} from '../models/post-item';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ZjErrorStateMatcher} from '../utils/validation-utils.component';
import {PostItemService} from '../services/post-item.service';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss'],
})
/*
* to adding and editing post we have one dialog component that handles both
* */
export class EditPostComponent {

    header: string = '';
    isAdd: boolean = false;
    postForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
        title: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        body: new FormControl('', [Validators.required]),
    });
    matcher = new ZjErrorStateMatcher();

    constructor(
        private postItemService: PostItemService,
        @Inject(MAT_DIALOG_DATA) public data: PostItem,
        public dialogRef: MatDialogRef<EditPostComponent>,

    ) {
        this.initValues();
    }

    /*
    * method that initialize important variables that we need
    * */
    private initValues(): void {
        if (this.data) {
            this.header = 'Edit Post';
            this.postForm.patchValue({
                username: this.data.username,
                title: this.data.title,
                body: this.data.body
            });
        } else {
            this.header = 'Add Post';
            this.isAdd = true;
        }
    }

    /*
    * in case of we are editing or adding post we should call different APIs
    * */
    handleSave(): void {
        if(this.isAdd) {
            // @ts-ignore
            this.postItemService.savePost(this.postForm.get('body')?.value.toString(), this.postForm.get('title')?.value
            ).subscribe(() => {})
        } else {
            // @ts-ignore
            this.postItemService.updatePost(this.postForm.get('body')?.value.toString(), this.postForm.get('title')?.value, this.data.id, this.data.userId
            ).subscribe(() => {})
        }
    }
}
