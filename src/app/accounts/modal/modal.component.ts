import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DateComponent } from './date/date.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CloseComponent } from './close/close.component';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DateComponent, ConfirmComponent, CloseComponent, NgClass],
  styleUrls: ['./modal.component.css'],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  endDate: Date | null = null;
  isCloseModalOpen = false;
  accountID: number | string = '';
  @Input() terminalDate = '';
  startDate: Date | string = new Date(this.terminalDate);
  configService = inject(ConfigService);
  @Input() isBackdropOpen: boolean = false;
  @Input() isDateModalOpen: boolean = false;
  @Input() isConfirmModalOpen: boolean = false;
  @Output() closeBackdrop = new EventEmitter<void>();
  accountName: string = '';
  collectionName: string = '';

  closeModal() {
    this.isCloseModalOpen = false;
    this.closeBackdrop.emit();
  }

  openModal() {
    this.deleteTCSA(this.accountID);
    this.isConfirmModalOpen = false;
    this.isCloseModalOpen = true;
  }

  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.accountID = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.accountID);
    this.startDate = this.terminalDate;
    console.log(this.startDate);
  }

  private deleteTCSA(id: number | string): void {
    this.configService.deleteTCSA(id).subscribe((response) => {
      console.log(response);
      this.accountName = response.accountName;
      this.collectionName = response.collectionName;
    });
  }
}
