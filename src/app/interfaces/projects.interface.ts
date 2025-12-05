import { HitoProyecto } from "../utils/responses-interfaces/projectsResponse";

export interface ProjectsInterface {
  id: number;
  titulo: string;
  categoria: string;
  descripcionproyecto: string;
  fechainicio: Date | string;
  areaaplicacion: string;
  estado: string;
  imgurl?: string;
  hitoproyecto: HitoProyecto[];
}
