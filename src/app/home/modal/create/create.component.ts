import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ConfigService } from '../../../config.service';
import moment from 'moment';

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
  pageData: any = {};
  entries: any = 0;
  data: any = {};

  tcsaForm = new FormGroup({
    collectionName: new FormControl('', Validators.required),
    terminalDate: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.loadTCSA();
  }

  configService = inject(ConfigService);

  handleSubmit() {
    this.data = {
      id: this.entries + 1,
      accountName: 'African Artists’ Foundation',
      collectionName: this.tcsaForm.value.collectionName,
      terminalDate: moment(this.tcsaForm.value.terminalDate).format('M/D/YYYY'),
      accountNumber: '0123456789',
      transactions: [],
    };
    this.configService
      .postTCSA(this.data)
      .subscribe((response) => console.log(response));

    this.configService.getAllTCSAs(1);
    this.closeModal();
  }

  private loadTCSA(): void {
    this.configService.getAllTCSAs(1).subscribe((response) => {
      this.pageData = response;
      this.entries = this.pageData.items;
    });
  }
}
