import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Rx";
import { Subject } from 'rxjs/Subject';
import { from } from 'rxjs'

import { Contact } from "../contacts/models/contact";

@Injectable()
export class ContactService {
    private url: string = "http://localhost:3000/contacts";

    constructor(
        private http: HttpClient
    ) { }

    private getHeadersJson() {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        return options;
    }

    list() {
        let res = this.http.get<Contact[]>(this.url, this.getHeadersJson());
        console.log(JSON.stringify(res));
        return res;
    }


    // console.log(JSON.stringify(res));

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