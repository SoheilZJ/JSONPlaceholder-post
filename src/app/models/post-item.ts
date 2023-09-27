/*
* declare post item interface
* */
export interface PostItem {
    body: string;
    id: number;
    title: string;
    userId: number;
    username: string;
}

/*
* post item model (in case of we want to create new PostItem())
* */
export class PostItem implements PostItem {
    body: string;
    id: number;
    title: string;
    userId: number;
    username: string;

    constructor() {
        this.body = '';
        this.id = 0;
        this.title = 'string';
        this.userId = 0;
        this.username = '';
    }
}
