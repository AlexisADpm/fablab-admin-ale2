import { Component, OnInit } from '@angular/core';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [SummaryCardsComponent],
})
export class DashboardComponent implements OnInit {
  username: string | null = '';

  ngOnInit() {
    this.username = localStorage.getItem('username');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
