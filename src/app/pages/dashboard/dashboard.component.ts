import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {}
