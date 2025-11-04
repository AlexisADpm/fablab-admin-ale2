import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import dbProyectos from '../../data/dblocalproyectos.json';
import { ProjectsInterface } from '../../interfaces/projects.interface';
import { ProjectsService } from '../../../app/services/projects.service';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { PaginationService } from '../../services/pagination.service';
import { BuscadorComponent } from '../../shared/searcher/searcher.component';

@Component({
  selector: 'gestion-proyectos',
  standalone: true,
  imports: [NgFor, PaginationComponent, BuscadorComponent],
  templateUrl: './projects-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsTableComponent {
  //Servicios
  projectsService = inject(ProjectsService);
  paginationService = inject(PaginationService);

  constructor() {
    // Llamada de prueba al iniciar
    this.projectsService.getProjects();
  }

  // Métodos para probar desde botones
  editProject(id: number) {
    this.projectsService.putProject(id);
  }

  deleteProject(id: number) {
    this.projectsService.deleteProject(id);
  }

  // ---------------------------
  // Paginacion
  // ---------------------------

  projectsList: ProjectsInterface[] = dbProyectos;
  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.projectsList.length / this.itemsPerPage);
  }

  get proyectosPaginados() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.projectsList.slice(start, start + this.itemsPerPage);
  }

  irAPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  testData(){
    console.log(this.projectsService.projectsData());
  }

}
