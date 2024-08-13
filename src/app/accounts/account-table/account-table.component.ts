import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowLeftShort,
  bootstrapArrowRightShort,
} from '@ng-icons/bootstrap-icons';
import { DatePipe, NgClass } from '@angular/common';
import { Transaction } from '../../transaction.object';

@Component({
  selector: 'app-account-table',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgClass, NgIconComponent, DatePipe],
  styleUrls: ['./account-table.component.css'],
  templateUrl: './accounts-table.component.html',
  viewProviders: [
    provideIcons({ bootstrapArrowLeftShort, bootstrapArrowRightShort }),
  ],
})
export class AccountTableComponent {
  headings = [
    'Account Name',
    'Collection Name',
    "Sender's Name",
    'Narration',
    'Transaction Date',
    'Status',
  ];

  @Input() data: Transaction[] | any;
  @Input() accountName: any;
  @Input() transactions: Transaction[] = [];
  @Input() collectionName: any;
  @Input() accountID: number = 0;
  @Input() page: number = 1;
  @Input() itemsPerPage: number = 0;
  @Input() entries: number = 0;
  @Input() totalPages: number = 0;
  @Output() changePageEvent = new EventEmitter<number>();
  @Output() loadTCSAByIDEvent = new EventEmitter<number>();
  @Output() loadTransactionsEvent = new EventEmitter<number>();

  @Output() loadPaginatedTransactionsEvent = new EventEmitter<{
    id: number;
    page: number;
  }>();

  changePage(page: number): void {
    this.changePageEvent.emit(page);
  }

  loadTCSAByID(id: number) {
    this.loadTCSAByIDEvent.emit(id);
  }

  loadTransactions(id: number) {
    this.loadTransactionsEvent.emit(id);
  }

  loadPaginatedTransactions(id: number, page: number) {
    this.loadPaginatedTransactionsEvent.emit({ id, page });
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadTCSAByID(this.accountID);
    this.loadTransactions(this.accountID);
    this.loadPaginatedTransactions(this.accountID, this.page);
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.changePage(this.page);
    }
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.changePage(this.page);
    }
  }
}
