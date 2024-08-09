import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faSolidCheck } from '@ng-icons/font-awesome/solid';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Tcsa } from '../../../tcsa.object';

@Component({
  selector: 'app-close',
  standalone: true,
  imports: [NgIconComponent, RouterOutlet, RouterLink],
  viewProviders: [provideIcons({ faSolidCheck })],
  styleUrl: './close.component.css',
  templateUrl: './close.component.html',
})
export class CloseComponent {
  @Input() isCloseModalOpen: boolean = false;
  // @Input() accountName: string = '';
  // @Input() collectionName: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
