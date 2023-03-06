import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListServiceService } from 'src/app/services/list-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export default class ListsComponent implements OnInit {
  lists$: Observable<any[]>;

  constructor(private listsService: ListServiceService){}

  ngOnInit(): void {
    this.listsService.refreshLists();
    this.lists$ = this.listsService.lists$;
  }


}
