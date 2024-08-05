import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgOptimizedImage],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  logoUrl = '/logo.png';
  searchIcon = '/Search.svg';
  leaveIcon = '/leave.svg';
}
