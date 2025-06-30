import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'new-project',
  imports: [],
  templateUrl: './new-project.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewProjectComponent {
  enviarSolicitud(event: Event) {
    event.preventDefault(); // Evita el recargo de la página

    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const proyecto = {
      titulo: data.get('titulo'),
      descripcion: data.get('descripcion'),
      categoria: data.get('categoria'),
      individual: data.get('individual') === 'true',
      integrantesNecesarios: Number(data.get('integrantesNecesarios')),
      referencia: data.get('referencia'),
      fechaInicio: data.get('fechaInicio'),
    };

    // Guardar en localStorage
    const solicitudes = JSON.parse(
      localStorage.getItem('solicitudesProyectos') || '[]'
    );
    solicitudes.push(proyecto);
    localStorage.setItem('solicitudesProyectos', JSON.stringify(solicitudes));

    alert('Solicitud enviada correctamente');
    form.reset();
  }
}
