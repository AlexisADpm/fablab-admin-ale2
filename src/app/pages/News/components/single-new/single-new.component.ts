import { Component, inject, OnInit, signal } from '@angular/core';
import { NewsService } from '../../../../services/news.service';
import { News } from '../../../../interfaces/news.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-new',
  imports: [],
  templateUrl: './single-new.component.html',
  styleUrl: './single-new.component.css'
})
export class SingleNewComponent implements OnInit {

  NewsService = inject(NewsService);

  //Data de la noticia
  singleNewsData = signal<News | undefined >(undefined);

  id = signal<number>(1);


  constructor(private route:ActivatedRoute) {
  }

  ngOnInit(): void {

    const idRoute:number = parseInt(this.route.snapshot.paramMap.get("id")!);

    this.singleNewsData.set(
      this.NewsService.newsResponse()
      .find((obj)=> obj.id === idRoute))
  }














}
