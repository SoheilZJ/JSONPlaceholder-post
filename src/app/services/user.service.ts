import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {UserModel} from '../models/user.model';

@Injectable({providedIn: "root"})
export class UserService {

    /*
    * i create a cache to prevent extra API calls
    * */
    cachedUsers: BehaviorSubject<any> = new BehaviorSubject(null);

    /*
    * if my cache is empty it calls a API and get the data
    * I needed usernames, so I somehow manage that to get users only once
    * note: all user count is 10 so it better to store that
    * */
    get users$(): Observable<UserModel[]> {
        return this.cachedUsers.getValue()
            ? this.cachedUsers.asObservable()
            : this.getUsers();
    }

    private readonly _http = inject(HttpClient);

    getUsers(): Observable<UserModel[]> {
        return this._http.get<UserModel[]>("https://jsonplaceholder.typicode.com/users").pipe(
            tap((users: UserModel[]) => this.cachedUsers.next(users))
        );
    }

    getUsernameById(id: number): Observable<string> {
        return this.users$.pipe(
            map(users => {
                return users.filter(user => user.id === id)[0].username;
            })
        );
    }

}
