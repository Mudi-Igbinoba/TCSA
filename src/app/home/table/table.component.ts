import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  bootstrapArrowLeftShort,
  bootstrapArrowRightShort,
} from '@ng-icons/bootstrap-icons';
import { DatePipe, NgClass } from '@angular/common';
import { ConfigService } from '../../config.service';
import { Tcsa } from '../../tcsa.object';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterOutlet, NgClass, RouterLink, NgIconComponent, DatePipe],
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
  viewProviders: [
    provideIcons({ bootstrapArrowLeftShort, bootstrapArrowRightShort }),
  ],
})
export class TableComponent {
  headings = [
    'Account Name',
    'Collection Name',
    'Terminal Date',
    'Account Number',
    'Action',
  ];

  private configService = inject(ConfigService);
  page: number = 1;
  pageData: any = {};
  entries: any = 0;
  totalPages: any = 1;

  data: Tcsa[] = [];

  ngOnInit(): void {
    this.loadTCSA();
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

  changePage(page: number): void {
    if (this.page !== page) {
      this.page = page;
      this.loadTCSA();
    }
  }

  private loadTCSA(): void {
    this.configService.getAllTCSAs(this.page).subscribe((response) => {
      this.pageData = response;
      console.log(this.pageData);
      this.data = this.pageData.data;
      this.entries = this.pageData.items;
      this.totalPages = this.pageData.pages;
    });
  }
}
