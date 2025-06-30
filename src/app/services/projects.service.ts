import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor() {}

  obtenerProyectos() {
    console.log('ProjectsService: obtenerProyectos ejecutado');
  }

  agregarProyecto(proyecto: any) {
    console.log('ProjectsService: agregarProyecto ejecutado', proyecto);
  }

  editarProyecto(id: number) {
    console.log('ProjectsService: editarProyecto ejecutado', id);
  }

  eliminarProyecto(id: number) {
    console.log('ProjectsService: eliminarProyecto ejecutado', id);
  }
}
