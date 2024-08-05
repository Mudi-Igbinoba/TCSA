import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  styleUrl: './create.component.css',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  @Input() isCreateModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  collectionName = '';

  tcsaForm = new FormGroup({
    collectionName: new FormControl('', Validators.required),
    terminalDate: new FormControl('', Validators.required),
  });

  configService = inject(ConfigService);
  handleSubmit() {
    this.configService
      .postTCSA()
      .subscribe((response) => console.log(response));

    alert(
      this.tcsaForm.value.collectionName + '' + this.tcsaForm.value.terminalDate
    );
    this.configService.getAllTCSAs(1);
    this.closeModal();
  }
}
