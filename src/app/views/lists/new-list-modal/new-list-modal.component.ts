import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListServiceService } from 'src/app/services/list-service.service';

@Component({
  selector: 'app-new-list-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
          <div class="modal-header">
            <h5 *ngIf="!modeIsUpdate()" class="modal-title" id="staticBackdropLabel">New List</h5>
            <h5 *ngIf="modeIsUpdate()" class="modal-title" id="staticBackdropLabel">Editing list - {{data?.name?.value}}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <label for="name" class="form-label">Name</label>
              <form class="formgroup" [formGroup]="list">
                <input class="form-control" type="text" name="name" id="name" formControlName="name">
              </form>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
            <button *ngIf="!modeIsUpdate()" type="button" class="btn btn-primary" (click)="add()">Add</button>
            <button *ngIf="modeIsUpdate()" type="button" class="btn btn-primary" (click)="update()">Update</button>
          </div>
  `,
  styleUrls: ['./new-list-modal.component.scss']
})
export class NewListModalComponent implements OnInit {
  @Input() data: any;
  @Input() mode: any;

  list = new FormGroup({
    name: new FormControl(''),
    id: new FormControl()
  });

  constructor(private activeModal: NgbActiveModal, private listsService: ListServiceService){}

  ngOnInit(): void {
    console.log('Mode ...',  this.mode, this.data);
    
    if(this.modeIsUpdate()) {
      if(this.data) {
        this.list.setControl('id', new FormControl(this.data.id._value));
        this.list.setControl('name', new FormControl(this.data.name.value));
      }
    }
  }

  cancel():void {
    this.activeModal.close('Cancelled');
  }

  add(): void {
    this.listsService.addList(this.list.value)
      .subscribe((result) => {
        this.activeModal.close('Added');
      })
  }

  update(): void {
    this.listsService.updateList(this.list.value)
    .subscribe((result) => {
      this.activeModal.close('Updated');
    })

  }

  modeIsUpdate(): boolean {
    return this.mode === 'update';
  }
}
