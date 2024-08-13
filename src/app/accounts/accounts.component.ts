import { Component, inject } from '@angular/core';
import { bootstrapChevronLeft } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { matCalendarTodayOutline } from '@ng-icons/material-icons/outline';
import { NgOptimizedImage } from '@angular/common';
import { faCircleXmark } from '@ng-icons/font-awesome/regular';
import { AccountTableComponent } from './account-table/account-table.component';
import { ModalComponent } from './modal/modal.component';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../config.service';
import { Transaction } from '../transaction.object';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgIconComponent,
    NgOptimizedImage,
    AccountTableComponent,
    ModalComponent,
    HeaderComponent,
  ],
  styleUrls: ['./accounts.component.css'],
  templateUrl: './accounts.component.html',
  viewProviders: [
    provideIcons({
      bootstrapChevronLeft,
      matCalendarTodayOutline,
      faCircleXmark,
    }),
  ],
})
export class AccountsComponent {
  stickyIcon = './sticky.svg';

  modal = {
    isBackdropOpen: false,
    isDateModalOpen: false,
    isConfirmModalOpen: false,
  };

  openDateModal() {
    this.modal.isBackdropOpen = true;
    this.modal.isDateModalOpen = true;
    this.terminalDate = this.data.terminalDate;
  }

  openConfirmModal() {
    this.modal.isBackdropOpen = true;
    this.modal.isConfirmModalOpen = true;
  }

  closeModal() {
    this.modal.isBackdropOpen = false;
    this.modal.isDateModalOpen = false;
    this.modal.isConfirmModalOpen = false;
  }

  data: Transaction[] | any;
  accountName: any;
  transactions: Transaction[] = [];
  collectionName: any;
  accountID: number = 0;
  page: number = 1;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  entries: number = 0;
  terminalDate: Date | any = '';

  private configService = inject(ConfigService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountID = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTCSAByID(this.accountID);
    this.loadTransactions(this.accountID);
    this.loadPaginatedTransactions(this.accountID, this.page);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.loadPaginatedTransactions(this.accountID, this.page);
    }
  }

  loadTCSAByID(id: number): void {
    this.configService.getTCSAByID(id).subscribe((response) => {
      this.accountName = response.accountName;
      this.terminalDate = response.terminalDate;
      this.collectionName = response.collectionName;
    });
  }

  loadTransactions(id: number) {
    this.configService.getAllTransactions(id).subscribe((response) => {
      this.data = response;
      this.entries = response.length;
      if (this.entries > 0 && this.itemsPerPage > 0) {
        this.totalPages = Math.ceil(this.entries / this.itemsPerPage);
      } else {
        this.totalPages = 1; // Default to 1 page if calculation is invalid
      }
    });
  }

  loadPaginatedTransactions(id: number, page: number) {
    this.configService
      .getPaginatedTransactions(id, page)
      .subscribe((response) => {
        this.transactions = response;
        this.itemsPerPage = response.length;
      });
  }
}
