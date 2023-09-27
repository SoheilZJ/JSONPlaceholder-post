import {inject, Injectable} from "@angular/core";
import {ComponentStore, OnStoreInit, tapResponse,} from "@ngrx/component-store";
import {map, Observable, switchMap, tap, withLatestFrom} from "rxjs";
import {PostItem} from "../models/post-item";
import {PostItemService} from "../services/post-item.service";
import {UserService} from '../services/user.service';

export interface AppState {
    postItems: PostItem[];
    offset: number;
    pageSize: number;
}

const initialState: AppState = {
    postItems: [],
    offset: 0,
    pageSize: 10,
};

@Injectable()
export class PostsStore
    extends ComponentStore<AppState>
    implements OnStoreInit {
    private readonly _postItemService = inject(PostItemService);
    private readonly _userService = inject(UserService);

    readonly vm$ = this.select(({postItems}) => ({postItems}));

    constructor() {
        super(initialState);
    }

    ngrxOnStoreInit() {
        this.loadPage();
    }

    /*
    * This method help us to get all post after loading posts page
    * and handle pagination
    * */
    readonly loadPage = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(this.select((state: AppState) => state)),
            map(([, state]) => state),
            switchMap(({offset, pageSize}) =>
                this._postItemService.getPostItems(offset * pageSize, pageSize).pipe(
                    tapResponse(
                        (postItems: PostItem[]) => {
                            this._userService.users$.subscribe(users => {
                                postItems.forEach(p => {
                                    let currentUser = users.filter(user => user.id == p.userId)[0];
                                    p.username = currentUser.username;
                                })
                            });
                            this.updatePostItems(postItems);
                        },
                        () => console.error("Something went wrong")
                    )
                )
            ),
        );
    });

    /*
    * This is how we are load last 10 posts
    * */
    readonly loadLastPage = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(this.select((state) => state.offset)),
            map(([, state]) => state),
            tap((offset) => this.updateOffset(offset - 1)),
            tap(() => this.loadPage())
        );
    });

    /*
    * This is how we are load next 10 posts
    * */
    readonly loadNextPage = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            withLatestFrom(this.select((state) => state.offset)),
            map(([, state]) => state),
            tap((offset) => this.updateOffset(offset + 1)),
            tap(() => this.loadPage())
        );
    });

    /*
    * This method update offset of the items (that we cross that with pageSize)
    * */
    private readonly updateOffset = this.updater(
        (state: AppState, offset: number) => ({
            ...state,
            offset,
        })
    );

    /*
    * This method update (replace) new 10 post with old 10 post
    * */
    private readonly updatePostItems = this.updater(
        (state: AppState, postItems: PostItem[]) => ({
            ...state,
            postItems: postItems,
        })
    );
}
