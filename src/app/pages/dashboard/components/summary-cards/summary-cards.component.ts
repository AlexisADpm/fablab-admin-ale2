import { ChangeDetectionStrategy, Component } from '@angular/core';

import dblocalusuarios from '../../../../data/dblocalusuarios.json';
import dblocalproyectos from '../../../../data/dblocalproyectos.json';
import { UsersInterface } from '../../../../interfaces/users';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'summary-cards',
  imports: [RouterLink],
  templateUrl: './summary-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryCardsComponent {
  listaUsuarios: UsersInterface[] = dblocalusuarios;
  proyectos: ProjectsInterface[] = dblocalproyectos;
}
