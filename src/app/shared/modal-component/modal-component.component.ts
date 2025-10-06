import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.component.html',
})
export class ModalComponentComponent { 
  @Input() show = false; 
  @Input() title = 'Título del modal';
  @Input() description = 'Descripción del contenido del modal';
  @Input() acceptText = 'Aceptar';
  @Input() declineText = 'Cancelar';

  @Output() accept = new EventEmitter<void>();
  @Output() decline = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  // La lógica para cerrar el modal (this.show = false)
  // DEBE ser manejada por el componente padre a través de los outputs.
  
  onAccept() {
    this.accept.emit();
  }

  onDecline() {
    // Si no hay texto de rechazo, asumimos que no hay botón.
    if (this.declineText) {
      this.decline.emit();
    }
  }

  onClose() {
    this.close.emit();
  }
}