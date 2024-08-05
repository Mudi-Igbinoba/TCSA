import { Component, EventEmitter, Input, Output } from '@angular/core';
import { bootstrapExclamationTriangle } from '@ng-icons/bootstrap-icons';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [NgIconComponent, NgClass],
  viewProviders: [provideIcons({ bootstrapExclamationTriangle })],
  styleUrl: './confirm.component.css',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent {
  @Input() isConfirmModalOpen: boolean = false;
  @Input() accountName: string = '';
  @Input() collectionName: string = '';
  @Output() close = new EventEmitter<void>();
  @Output() open = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  openModal() {
    this.open.emit();
  }
}
