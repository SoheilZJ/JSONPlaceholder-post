import {HttpClient, HttpParams} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PostItem} from "../models/post-item";

@Injectable({providedIn: "root"})
export class PostItemService {

    private readonly _http = inject(HttpClient);

    /*
    * get All posts with pagination
    * */
    getPostItems(offset?: number, pageSize?: number): Observable<PostItem[]> {
        const params = new HttpParams({
            fromObject: {
                _start: offset ?? 0,
                _limit: pageSize ?? 10,
            },
        });
        return this._http.get<PostItem[]>(
            "https://jsonplaceholder.typicode.com/posts",
            {params}
        );
    }

    /*
    * get Single post with id
    * */
    getPost(id: number): Observable<PostItem> {
        return this._http.get<PostItem>(`https://jsonplaceholder.typicode.com/posts/${id}`);
    }

    /*
    * update a post with help of PUT method
    * */
    updatePost(body: string, title: string, id: number, userId: number): Observable<PostItem> {
        const params = new HttpParams().set('Content-type', 'application/json; charset=UTF-8');
        return this._http.put<PostItem>(`https://jsonplaceholder.typicode.com/posts/${id}`, JSON.stringify({
            body,
            title,
            id,
            userId
        }), {params})
    }

    /*
    * method to save a post (with POST)
    * */
    savePost(body: string, title: string): Observable<PostItem> {
        const params = new HttpParams().set('Content-type', 'application/json; charset=UTF-8');
        return this._http.post<PostItem>('https://jsonplaceholder.typicode.com/posts', JSON.stringify({
            body,
            title,
            userId: 1
        }), {params})
    }

}
