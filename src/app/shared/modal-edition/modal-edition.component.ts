import { Component, EventEmitter, Output, output } from '@angular/core';

@Component({
  selector: 'modal-edition',
  imports: [],
  templateUrl: './modal-edition.component.html',
})
export class ModalEditionComponent {
  @Output() close = new EventEmitter<void>();

  //Cierra el modal.
  onClose(): void {
    this.close.emit();
  }
}
