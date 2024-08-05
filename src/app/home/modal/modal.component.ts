import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../config.service';
import { CreateComponent } from './create/create.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CreateComponent, NgClass],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() isBackdropOpen: boolean = true;
  @Input() isCreateModalOpen: boolean = false;
  @Output() closeBackdrop = new EventEmitter<void>();

  closeModal() {
    this.closeBackdrop.emit();
  }
}
