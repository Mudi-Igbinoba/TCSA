import { Component, inject } from '@angular/core';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from '../header/header.component';
import { ModalComponent } from './modal/modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableComponent, HeaderComponent, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  modal = {
    isBackdropOpen: true,
    isCreateModalOpen: true,
  };

  closeModal() {
    this.modal.isBackdropOpen = false;
    this.modal.isCreateModalOpen = false;
  }
}
