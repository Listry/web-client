import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  URI = 'http://localhost:3000';
  LISTS_URI = `${this.URI}/app/list`

  constructor(private http: HttpClient) { }

  fetchLists(): Observable<any[]> {
    return this.withErrorHandling(this.http.get<any[]>(`${this.LISTS_URI}`));
  }

  addList(addListDto: {name?: string}): Observable<any> {
    return this.withErrorHandling(this.http.post<any>(`${this.LISTS_URI}`, addListDto));
  }

  remove(listId: string): Observable<any> {    
    return this.withErrorHandling(this.http.delete<any>(`${this.LISTS_URI}/${listId}`));
  }

  update(list: {id?: string, name?: string}): Observable<any> {    
    return this.withErrorHandling(this.http.put<any>(`${this.LISTS_URI}/${list.id}`, list));
  }

  withErrorHandling(requestObservable: Observable<any>): Observable<any> {
    return requestObservable
    .pipe(catchError((err, caught) => { console.error(err); return of(); }))
  }
}