import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { CommonModule } from '@angular/common';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { ProjectsService } from '../../../../services/projects.service';

@Component({
  selector: 'individual-project',
  templateUrl: './individual-project.component.html',
  imports: [RouterLink, CommonModule],
  standalone: true,
})
export class IndividualProjectComponent implements OnInit {
  //Servicios
  projectsService = inject(ProjectsService);
  route = inject(ActivatedRoute);

  //Atributos
  proyecto: ProjectsInterface[] = dblocalproyectos;
  proyectoEncontrado?: ProjectsInterface;

  //Ciclos de vida
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.proyecto);
    this.searchById(id);
    console.log(this.proyectoEncontrado);
  }

  //Metodos
  searchById(id: number): void {
    const objectFind = this.projectsService.projectsData().find(
      (proyecto) => proyecto.id === id
    );
    this.proyectoEncontrado = objectFind;
  }
}
