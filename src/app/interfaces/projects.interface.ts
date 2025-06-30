export interface CarteraProyecto {
  id: number;
  nombre: string;
  descripcion: string;
  integrantes: string[];
}

export interface ProjectsInterface {
  projectId: number;
  title: string;
  description: string;
  date: string;
  imgUrl: string;
  categoria: string;
  cartera_proyecto: CarteraProyecto;
}
