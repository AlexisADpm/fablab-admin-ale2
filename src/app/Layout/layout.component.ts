import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { AllUsersComponent } from '../pages/Users/all-users/all-users.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, AllUsersComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent{
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @ViewChild('navItems') navItems!: ElementRef;

  //Activaacion de Menu
  menuActivate = signal<boolean>(true);

  constructor(private render: Renderer2) {}


  hideContent():void {
    if(this.menuActivate()){
      this.menuActivate.set(false);
      this.render.addClass(this.sideMenu.nativeElement,"w-[100px]");
      this.render.addClass(this.navItems.nativeElement,"translate-x-[-180%]");
      return;
    }

    this.menuActivate.set(true);
    this.render.removeClass(this.sideMenu.nativeElement,"w-[100px]");
    this.render.removeClass(this.navItems.nativeElement,"translate-x-[-180%]");
    console.log(this.navItems.nativeElement);
  }
}
