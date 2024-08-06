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
import { Tcsa } from '../tcsa.object';

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

  data: Tcsa | {} = {};
  accountName: any;
  transactions: Transaction[] = [];
  collectionName: any;
  accountID: number = 0;
  page: number = 1;
  pageData: any = {};
  entries: any = 0;
  totalPages: any = 1;
  terminalDate: string = '';

  private configService = inject(ConfigService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.accountID = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.accountID);
  }

  changePage(page: number): void {
    if (this.page !== page) {
      this.page = page;
      this.loadTCSAByID(this.accountID);
      this.loadTransactionsByID(this.accountID, this.page);
    }
  }

  loadTCSAByID(id: number): void {
    this.configService.getTCSAByID(id).subscribe((response) => {
      this.data = response;
      this.accountName = response.accountName;
      this.terminalDate = response.terminalDate;
      this.collectionName = response.collectionName;
    });
  }

  loadTransactionsByID(id: number, page: number) {
    this.configService.getTransactionByID(id, page).subscribe((response) => {
      this.pageData = response;
      this.transactions = this.pageData.data;
      this.entries = this.pageData.items;
      this.totalPages = this.pageData.pages;
    });
  }
}
