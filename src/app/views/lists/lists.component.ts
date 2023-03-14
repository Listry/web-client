import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListServiceService } from 'src/app/services/list-service.service';
import { firstValueFrom, interval, Observable, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewListModalComponent } from './new-list-modal/new-list-modal.component';
@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, SharedModule, NewListModalComponent],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export default class ListsComponent implements OnInit {
  lists$: Observable<any[]> = this.listsService.lists$.pipe();

  constructor(private listsService: ListServiceService, private modalService: NgbModal){}

  async ngOnInit() {
    this.listsService.refreshLists(); 
  }

  openAddListModal(): void {
    const modalRef = this.modalService.open(NewListModalComponent);
  }

  edit(list: any) {
    const modalRef = this.modalService.open(NewListModalComponent);
    modalRef.componentInstance.mode = 'update';
    modalRef.componentInstance.data = list;
  }

  remove(list: any) {    
    this.listsService.remove(list.id._value)
      .subscribe();
  }
}
