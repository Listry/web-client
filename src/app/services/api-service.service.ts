import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  URI = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  fetchLists(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URI}/app/list`)
      .pipe(catchError((err, caught) => { console.error(err); return of(); }))
  }
}
