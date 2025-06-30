import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'request',
  imports: [NgFor],
  templateUrl: './request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestComponent {
  solicitudes = [
    {
      nombreProyecto: 'Sistema de automatización FabLab',
      fecha: '2025-06-27',
      descripcion:
        'Un sistema para agendar máquinas del laboratorio y registrar horas de uso con IoT.',
    },
    {
      nombreProyecto: 'App de control de acceso NFC',
      fecha: '2025-06-24',
      descripcion:
        'Aplicación para autenticar el ingreso al laboratorio mediante tarjetas NFC.',
    },
    {
      nombreProyecto: 'Sitio colaborativo de diseño 3D',
      fecha: '2025-06-21',
      descripcion:
        'Portal web donde estudiantes puedan subir y descargar modelos 3D propios.',
    },
  ];

  aprobarSolicitud(solicitud: any) {
    alert(`Solicitud aprobada: ${solicitud.nombreProyecto}`);
    // Aquí podrías moverla a otra lista, cambiar estado, o hacer un POST
  }

  rechazarSolicitud(solicitud: any) {
    alert(`Solicitud rechazada: ${solicitud.nombreProyecto}`);
    // Aquí puedes eliminarla o marcarla como rechazada
  }
}
