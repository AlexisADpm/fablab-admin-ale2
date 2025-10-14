// src/app/shared/buscador/buscador.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para componentes en Angular

@Component({
  selector: 'searcher',
  imports: [CommonModule],
  templateUrl: './searcher.component.html',
})
export class BuscadorComponent {
  // El valor actual del campo de búsqueda (Input para mostrar el estado)
  @Input() searchTerm: string = '';

  // El evento que emite el nuevo valor de búsqueda (Output para comunicar)
  @Output() search = new EventEmitter<string>();

  // Función que se llama desde el input del HTML
  onSearchChange(event: any) {
    this.search.emit(event.target.value);
  }
}
