import {Component, inject, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {
  ModalDismissReasons,
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective, NgbAccordionHeader, NgbAccordionItem,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu, NgbInputDatepicker, NgbModal,
  NgbPopover
} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgbPopover, NgbDropdown, NgbDropdownMenu, NgbDropdownItem, NgbAccordionDirective, NgbAccordionItem, NgbAccordionHeader, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionBody, NgbInputDatepicker, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PonteFrontend';

  constructor(private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }
}
