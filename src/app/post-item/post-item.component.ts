import {Component} from "@angular/core";
import {RouterUtilsService} from '../utils/router-utils.service';
import {MatDialog} from '@angular/material/dialog';
import {EditPostComponent} from '../edit-post/edit-post.component';

@Component({
    selector: "app-post-item",
    templateUrl: 'post-item.component.html',
    styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent {

    post: any = {};

    constructor(
        private routerUtilsService: RouterUtilsService,
        public dialog: MatDialog
    ) {
        // using router util service and get data from last page to avoiding calling api again
        this.post = this.routerUtilsService.getDataAfterNavigate();
    }

    /*
    * navigate to all posts page
    * */
    gotoPosts(): void {
        this.routerUtilsService.navigate('posts');
    }

    /*
    * open add or edit post modal (in this case we are editing)
    * */
    openEditDialog(): void {
        const dialogRef = this.dialog.open(EditPostComponent, {
            data : this.post,
            width: '1100px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}
