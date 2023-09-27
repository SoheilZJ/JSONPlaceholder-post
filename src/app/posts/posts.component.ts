import {Component, inject} from "@angular/core";
import {provideComponentStore} from '@ngrx/component-store';
import {PostsStore} from './posts.store';
import {PostItem} from '../models/post-item';
import {RouterUtilsService} from '../utils/router-utils.service';
import {EditPostComponent} from '../edit-post/edit-post.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: "posts",
    templateUrl: 'posts.component.html',
    styleUrls: ['./posts.component.scss'],
    providers: [provideComponentStore(PostsStore)]
})
export class PostsComponent {

    constructor(
        private routerUtilsService: RouterUtilsService,
        private dialog: MatDialog
    ) {
    }

    private readonly _componentStore = inject(PostsStore);
    readonly vm$ = this._componentStore.vm$;

    /*
    * on pagination button click to go backward
    * */
    onPreviousPage(): void {
        this._componentStore.loadLastPage();
    }

    /*
    * on pagination button click to go forward
    * */
    onNextPage(): void {
        this._componentStore.loadNextPage();
    }

    /*
    * go to single post page
    * this method uses router util, that helps us to send any data with rout and get that from that page
    * */
    goToPost(post: PostItem): void {
        this.routerUtilsService.navigateWithData('/post', post);
    }

    /*
    * opens a modal to add new post
    * */
    addPost(): void {
        this.dialog.open(EditPostComponent, {data: null, width: '1100px'});
    }

    /*
    * opens same modal(but a little diff) to edit posts
    * */
    editPost(post: PostItem): void {
        this.dialog.open(EditPostComponent, {data: post, width: '1100px'});
    }
}
