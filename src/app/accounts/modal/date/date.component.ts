import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe, NgClass } from '@angular/common';
import { bootstrapX } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-date',
  standalone: true,

  imports: [
    NgIconComponent,
    DatePipe,
    MatCardModule,
    NgClass,
    MatDatepickerModule,
  ],
  viewProviders: [provideIcons({ bootstrapX })],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './date.component.css',
  templateUrl: './date.component.html',
})
export class DateComponent {
  @Input() startDate: Date | string = '';
  @Input() endDate: Date | null = null;
  @Input() isDateModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    console.log(this.startDate);
  }
  closeModal() {
    this.close.emit();
  }
}
