import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService implements OnInit {

  lists$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
    this.refreshLists();
  }

  refreshLists(): void {
    this.apiService.fetchLists()
      .subscribe((list) => {
        this.lists$.next(list);
      });
  }
}
