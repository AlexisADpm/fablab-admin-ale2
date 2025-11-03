import { UsersInterface } from "../../interfaces/users.interface";

export interface ProjectsResponse {
  id:                  number;
  titulo:              string;
  categoria:           string;
  descripcionProyecto: string;
  areaAplicacion:      string;
  fechaInicio:         Date;
  usuarios: Array<UsersInterface>;
}
