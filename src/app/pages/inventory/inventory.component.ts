import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalComponentComponent } from '../../shared/modal-component/modal-component.component';
import { FormsModule } from '@angular/forms';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'inventory',
  imports: [CommonModule, FormsModule, BuscadorComponent, PaginationComponent],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  paginationService = inject(PaginationService);

  onBuscador($event: Event) {
    throw new Error('Method not implemented.');
  }
  productos = [
    {
      id: 1,
      nombre: 'PLA Rojo',
      categoria: 'Filamento',
      stock: 5,
      stockMin: 3,
      ubicacion: 'Estante A',
      descripcion: 'Carrete de filamento PLA rojo de 1kg.',
    },
    {
      id: 2,
      nombre: 'PLA Negro',
      categoria: 'Filamento',
      stock: 1,
      stockMin: 3,
      ubicacion: 'Estante A',
      descripcion: 'Carrete de filamento PLA negro de 1kg.',
    },
    {
      id: 3,
      nombre: 'Tarjetas plásticas',
      categoria: 'Laser',
      stock: 100,
      stockMin: 20,
      ubicacion: 'Cajón A2',
      descripcion: 'Tarjetas de plástico en blanco para grabado láser.',
    },
    {
      id: 4,
      nombre: 'Resina gris',
      categoria: 'Resina',
      stock: 2,
      stockMin: 5,
      ubicacion: 'Estante B',
      descripcion: 'Botella de resina gris estándar para impresora SLA.',
    },
    {
      id: 5,
      nombre: 'Tornillos M3',
      categoria: 'Ferretería',
      stock: 40,
      stockMin: 25,
      ubicacion: 'Cajón C1',
      descripcion: 'Tornillos de acero inoxidable M3x20mm.',
    },
    {
      id: 6,
      nombre: 'Cinta Kapton',
      categoria: 'Accesorios',
      stock: 0,
      stockMin: 2,
      ubicacion: 'Estante D',
      descripcion: 'Cinta Kapton resistente al calor para cama caliente.',
    },
  ];

  isModalOpen = false;
  selectedProducto: any = null;
  modalMode: 'view' | 'edit' | 'delete' = 'view';

  // ---------- Modal ----------
  openModal(producto: any, mode: 'view' | 'edit' | 'delete' = 'view') {
    this.selectedProducto = { ...producto }; // copiamos para evitar modificar directo
    this.modalMode = mode;
    this.isModalOpen = true;
    console.log(`Modal abierto en modo: ${mode}`, this.selectedProducto);
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProducto = null;
    console.log('Modal cerrado');
  }

  // ---------- Acciones ----------

  manejarAceptar(): void {
    // La lógica es clara: ¿Qué acción hacemos según el modo?
    if (this.modalMode === 'edit') {
      // Si estamos editando, llamamos a la función de guardado
      this.editarProducto();
    } else if (this.modalMode === 'delete') {
      // Si estamos eliminando, llamamos a la función de eliminación
      this.eliminarProducto();
    } else {
      // Si estamos en modo 'view' o cualquier otro, simplemente cerramos
      this.closeModal();
    }
  }

  editarProducto() {
    console.log('Guardar cambios de producto:', this.selectedProducto);

    this.closeModal();
  }

  cancelarEdicion() {
    console.log('Edición cancelada para:', this.selectedProducto);
    // No se guarda nada, solo cerramos, diego ayuda
    this.closeModal();
  }

  eliminarProducto() {
    console.log('Eliminar producto:', this.selectedProducto);
    // Aquí deberíamos llamar al servicio/API para eliminar el producto
    // Por ahora solo cerramos el modal
    this.closeModal();
  }

  // ---------- Indicadores ----------
  get totalProductos() {
    return this.productos.length;
  }

  get bajoStock() {
    // Devolver cuántos productos están en o por debajo de su stock mínimo
    return this.productos.filter((p) => p.stock <= p.stockMin).length;
  }
}
