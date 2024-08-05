import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowLeftShort,
  bootstrapArrowRightShort,
} from '@ng-icons/bootstrap-icons';
import { DatePipe, NgClass } from '@angular/common';
import { Tcsa } from '../../tcsa.object';
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

  @Input() data: Tcsa | {} = {};
  @Input() accountName: any;
  @Input() transactions: Transaction[] = [];
  @Input() collectionName: any;
  @Input() accountID: number = 0;
  @Input() page: number = 1;
  @Input() pageData: any = {};
  @Input() entries: any = 0;
  @Input() totalPages: any = 1;
  @Output() changePageEvent = new EventEmitter<number>();
  @Output() loadTCSAByIDEvent = new EventEmitter<number>();
  @Output() loadTransactionsByIDEvent = new EventEmitter<{
    id: number;
    page: number;
  }>();

  changePage(page: number): void {
    this.changePageEvent.emit(page);
  }

  loadTCSAByID(id: number) {
    this.loadTCSAByIDEvent.emit(id);
  }

  loadTransactionsByID(id: number, page: number) {
    this.loadTransactionsByIDEvent.emit({ id, page });
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadTCSAByID(this.accountID);
    this.loadTransactionsByID(this.accountID, this.page);
  }

  prev() {
    if (this.pageData.prev) {
      this.changePage(this.pageData.prev);
    }
  }

  next() {
    if (this.pageData.next) {
      this.changePage(this.pageData.next);
    }
  }
}
