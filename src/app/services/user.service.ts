import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';

import { Login } from "../auth/models/login";
import { User } from "../auth/models/user";

@Injectable()
export class UserService {
    private url: string = "http://localhost:3000/users/authenticate/";

    authChange = new Subject<boolean>();

    private isAuthenticated = false;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    private getHeadersJson() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        return options;
    }

    // registerUser(authData: AuthData) {
    //     this.user = {
    //       email: authData.email,
    //       userId: Math.round(Math.random() * 10000).toString()
    //     };
    //     this.authSuccessfully();
    //   }

    authenticate(login: Login): Observable<User> {
        let res = this.http.post<User>(this.url, login, this.getHeadersJson());
        this.authSuccessfully();
        return res;
    }

    logout() {
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/']);
    }

    // list() {
    //     return this.http.get<Book[]>(this.url, this.getHeadersJson());
    // }

    // insert(book: Book): Observable<Book> {
    //     let response = this.http
    //         .post<Book>(this.url, book, this.getHeadersJson());

    //     return response;
    // }

    // get(id: number): Observable<Book> {
    //     let response = this.http
    //         .get<Book>(this.url + '/' + id, this.getHeadersJson());

    //     return response;
    // }

    // update(book: Book): Observable<Book> {
    //     let response = this.http
    //         .put<Book>(this.url + '/' + book.id, book, this.getHeadersJson());

    //     return response;
    // }

    // delete(id: number) {
    //     return this.http.delete(this.url + '/' + id, this.getHeadersJson());
    // }
}