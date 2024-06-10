import {Component, EventEmitter, inject, Output, TemplateRef, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {GenericService} from "../../../generic/generic.service";
import {ContactCreate} from "../../../data/ContactCreate";

@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {
  @ViewChild('content') content?: TemplateRef<any>;
  @ViewChild('close-button') closeButton?: TemplateRef<any>;
  @Output() onSave = new EventEmitter<any>();

  form = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private modalService: NgbModal,private genericService:GenericService) {}

  open() {
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(result);
      },
    );
  }

  save() {
    console.log(this.form.value);
    this.genericService.post('contact',new ContactCreate(this.form.value.name as string))
      .subscribe((response:any) => {
        this.closeButton?.elementRef.nativeElement.click();
        this.onSave.emit(response);
    })

  }

}
