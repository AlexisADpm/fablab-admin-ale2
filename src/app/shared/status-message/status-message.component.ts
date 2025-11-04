import { Component, inject, input, signal } from '@angular/core';
import { NotificacionsStatusService } from '../../services/notificacionsStatus.service';

@Component({
  selector: 'status-message',
  imports: [],
  templateUrl: './status-message.component.html',
  styles: ``
})
export class StatusMessageComponent {

  //Servicios
  notificationStatus = inject(NotificacionsStatusService);

  //Atributos
  messageDisplay = input<string>(this.notificationStatus.statusTextMessage());
  messageDisplayError = input<string>(this.notificationStatus.statusErrorMessage());
  windowHeight = signal<number>(window.innerHeight-100);

}
