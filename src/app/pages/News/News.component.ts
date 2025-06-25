import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [RouterLink],
  templateUrl: './news.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {

  //Inyectar newService
  newsService = inject(NewsService);

  constructor(){
    console.log(this.newsService.newsResponse());
  }

}
