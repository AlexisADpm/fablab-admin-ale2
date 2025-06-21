import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @ViewChild('sideMenu') sideMenu!: ElementRef;

  constructor(private render: Renderer2) {}

  ngAfterViewInit(): void {
    console.log(this.sideMenu);
  }

  hideContent() {
    this.render.setStyle(
      this.sideMenu.nativeElement,
      'transform',
      'translateX(-100%)'
    );
  }
}
