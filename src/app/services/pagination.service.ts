import { computed, signal, WritableSignal } from '@angular/core';
import { Injectable } from '@angular/core';

/**
 * PaginationService (El Cerebro de la Paginación)
 * -----------------------------------------------
 * Lo que hace este servicio es manejar de forma generica la paginacion de los datos
 * de cualquiera de las tablas existentes, la forma en que lo hace es usando signal
 * tanto WritableSignal para los estados que se nos asignan directamente cuando un
 * componente usa el servicio, como tambien computed, que se calculan en base a las Writable
 * y se recalculan automaticamente cuando el estado de currentPage o Datalist cambia
 */
@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  // ===================================================================
  // 1. DEFINIR LAS SIGNAL QUE CAMBIARAN DURANTE LA EJECUCION
  // ===================================================================

  public currentPage = signal<number>(1);

  // itemsPerPage (Constante): Define la cantidad de datos que se mostraran por página.
  public itemsPerPage: number = 5;

  // dataList (WritableSignal): Contenedor para la lista completa de datos a paginar.
  // Es Writable porque el componente padre (ej: UsersComponent) DEBE establecer
  // qué lista debe paginar el servicio (la lista filtrada de usuarios o lista entera).
  private dataList = signal<any[]>([]);

  // ===================================================================
  // 2. ESTABLECER CON QUE DATOS VAMOS A TRABAJAR
  // ===================================================================

  /**
   * setDataList: Recibe la lista completa de datos (data)
   * del componente que lo utiliza y la guarda internamente (dataList).
   */
  setDataList(data: any[]): void {
    this.dataList.set(data);
  }

  // ===================================================================
  // 3. CALCULO Y GENERACION DE VARIABLES COMPUTADAS
  // ===================================================================

  // totalPages (Computed): Calcula el número total de páginas.
  // Se recalcula automáticamente CADA VEZ que dataList() cambia.
  // Math.ceil() asegura que si sobran elementos (ej: 17/5 = 3.4), se redondee a 4 páginas.

  totalPages = computed(() => {
    return Math.ceil(this.dataList().length / this.itemsPerPage);
  });

  // pagedItems (Computed): La "seccion" de la lista que se debe mostrar en la tabla.
  // Se recalcula automáticamente CADA VEZ que currentPage() o dataList() cambian.
  pagedItems = computed(() => {
    const list = this.dataList(); //Aqui esta la lista completa

    // START: (Página 1 - 1 * 5 -> start 0, Página 2 - 1 * 5 -> start 5, etc.)
    const start = (this.currentPage() - 1) * this.itemsPerPage;

    // END: Índice final (no inclusivo). Asegura que obtenemos exactamente 5 ítems.
    // start 0 + 5 -> end 5, start 5 + 5 -> end 10, etc.)
    const end = start + this.itemsPerPage;

    // El UsersComponent consumirá esta Signal para renderizar la tabla.
    // Start 0 end 5 -> return [0,1,2,3,4]
    return list.slice(start, end);
  });

  // ===================================================================
  // 4. LÓGICA DE NAVEGACIÓN CON VALIDACION
  // ===================================================================

  /**
   * goToPage: Navega a una página específica.
   * page es el número de página deseado.
   */
  goToPage(page: number): void {
    // Validación: Solo permite ir a una página si el número está dentro del rango válido.
    // Si la pagina es mayor que 1 y menor que el total de paginas le da el valor de page a currentPage.
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }
}
