import { Component, inject } from '@angular/core';
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
  totalPages: number = 0;

  itemsPerPage: number = 10;
  data: Tcsa[] | any = [];
  entries: number = 0;

  ngOnInit(): void {
    this.loadAllTCSA();
    this.loadPaginatedTCSA();
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

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
    }
    this.loadPaginatedTCSA();
  }

  private loadPaginatedTCSA(): void {
    this.configService.getPaginatedTCSAs(this.page).subscribe((response) => {
      this.data = response;
      this.itemsPerPage = this.data.length;
    });
  }

  private loadAllTCSA(): void {
    this.configService.getAllTCSAs().subscribe((response) => {
      this.entries = response.length;
      if (this.entries > 0 && this.itemsPerPage > 0) {
        this.totalPages = Math.ceil(this.entries / this.itemsPerPage);
      } else {
        this.totalPages = 1; // Default to 1 page if calculation is invalid
      }
    });
  }
}
