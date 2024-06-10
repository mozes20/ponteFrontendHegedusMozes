import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GenericService} from "../../generic/generic.service";
import {AuthService} from "../../services/auth.service";
import {Contact} from "../../data/Contact";
import {NgForOf, NgIf} from "@angular/common";
import {CreateModalComponent} from "./create-modal/create-modal.component";
import {AddEmailModalComponent} from "./add-email-modal/add-email-modal.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    CreateModalComponent,
    AddEmailModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,AfterViewInit,OnDestroy {
  contacts: Contact[] = [];
  loading: boolean = true;

  currentPage = 0;
  pageSize = 10;
  pageCount = 2;

  @ViewChild(CreateModalComponent) createModal?: CreateModalComponent;
  @ViewChild(AddEmailModalComponent) addEmailModal?: AddEmailModalComponent;

  constructor(private authService: AuthService,
              private GenericService: GenericService) {

  }

  ngOnInit(): void {
    this.getContacts()

  }

  ngAfterViewInit() {
    if (this.createModal) {
      this.createModal.onSave.subscribe((createdContact) => {
        this.getContacts();
      });
    }
  }

  ngOnDestroy() {
    this.createModal?.onSave.unsubscribe();
  }


  getContacts(){
    this.GenericService.get('contact/contacts?page='+this.currentPage+'&size=10').subscribe((response:any) => {
      this.contacts = response.content as Contact[]
      this.pageCount = response.totalPages
      this.loading = false;
    })
  }

  addContact(){
    this.createModal?.open()
  }

  addEmail(id: number){
    this.addEmailModal?.open(id)
  }

  deleteContact(id: number){
    this.GenericService.delete('contact/'+id).subscribe((response) => {
      this.getContacts()
    })

  }

  nextPage(){
    if (this.currentPage >= this.pageCount) return console.log('No more pages')
    this.currentPage++
    this.getContacts()
  }

  previousPage(){
    if (this.currentPage <= 0) return console.log('No more pages')
    this.currentPage--
    this.getContacts()
  }



}
