import {Component, EventEmitter, Output, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GenericService} from "../../../generic/generic.service";
import {ContactCreate} from "../../../data/ContactCreate";
import {Contact} from "../../../data/Contact";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-add-email-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-email-modal.component.html',
  styleUrl: './add-email-modal.component.css'
})
export class AddEmailModalComponent {
  @ViewChild('content') content?: TemplateRef<any>;
  @ViewChild('close-button') closeButton?: TemplateRef<any>;
  @Output() onEmailAdded = new EventEmitter<void>();

  createdContactId?: number;

  form = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
  });

  constructor(private modalService: NgbModal,private genericService:GenericService) {}

  open(id: number) {
    this.createdContactId = id;
    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        console.log(result);
      },
    );
  }

  addEmail() {
    if (this.form.valid) {
      console.log('addEmail method called');
      this.genericService.post('contact/email',
        {contactId: this.createdContactId,
              email: this.form.value.email})
        .subscribe((response) => {
          this.onEmailAdded.emit();
          this.form.reset();
          this.closeButton?.elementRef.nativeElement.click();
      })


    } else {
      console.log('Invalid email');
    }

  }

}
