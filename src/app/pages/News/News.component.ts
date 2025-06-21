import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent { }
