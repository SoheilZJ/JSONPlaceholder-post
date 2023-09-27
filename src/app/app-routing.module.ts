import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostItemComponent} from './post-item/post-item.component';
import {PostsComponent} from './posts/posts.component';

const routes: Routes = [
    {
        path: 'posts',
        component: PostsComponent,
    },
    {
        path: 'post', // route path
        component: PostItemComponent, // route component that the router renders
    },
    {
        path: '**', // if any other paths enters the app redirect us to the main path
        redirectTo: '/posts', pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}







