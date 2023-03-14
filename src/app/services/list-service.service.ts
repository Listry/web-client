import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService implements OnInit {

  lists$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }

  refreshLists(): void {
    this.apiService.fetchLists()
      .subscribe((list) => {
        console.log('Refreshing lists ... ', list);
        this.lists$.next(list);
      });
  }

  addList(addListsDto: {name?: string}): Observable<any> {
    return this.apiService.addList(addListsDto)
      .pipe(tap(listId => {
        this.refreshLists();
      }));
  }

  remove(listId: any): Observable<any> {
    return this.apiService.remove(listId)
    .pipe(tap(listId => {
      this.refreshLists();
    }));
  }

  updateList(list: any): Observable<any> {
    return this.apiService.update(list)
    .pipe(tap(listId => {
      this.refreshLists();
    }));
  }
}
