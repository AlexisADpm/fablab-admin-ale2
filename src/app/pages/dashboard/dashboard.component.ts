import { Component } from '@angular/core';
import { SummaryCardsComponent } from './components/summary-cards/summary-cards.component';
import { ProjectChartComponent } from './graphics/graphics.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  imports: [SummaryCardsComponent, ProjectChartComponent],
})
export class DashboardComponent {
  // Variables que se usan en el HTML
  nombreLider: string = 'Alexis';

  ngOnInit() {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}
