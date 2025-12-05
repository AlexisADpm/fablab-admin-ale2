import { Component, computed, effect, ElementRef, inject, OnInit, signal, viewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GraphicsService } from '../../../../services/graphics.service';
import { ProjectsByUser } from '../../../../interfaces/graphicsInterfaces/projectsByUser.interface';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { StatusMessageComponent } from '../../../../shared/status-message/status-message.component';

Chart.register(...registerables);

// Definimos el color principal RGB del amarillo FabLab: R=255, G=204, B=0
const FABLAB_R = 255;
const FABLAB_G = 204;
const FABLAB_B = 0;
// El color que usaremos para texto y ejes (Gris claro sobre fondo oscuro)
const TEXT_COLOR = '#333333';
const GRID_COLOR = 'rgba(100, 100, 100, 0.2)'; // Líneas muy sutiles

@Component({
  selector: 'charts',
  templateUrl: './charts.html',
  imports:[StatusMessageComponent]
})
export class Charts{

  //Servicios
  graphicsService = inject(GraphicsService);
  notificacionsStatusService = inject(NotificacionsStatusService);

  //Atributos
  loadingData = signal<boolean>(false);


  dataLabelsData = computed<ProjectsByUser>(()=>{
    if(this.graphicsService.graphicsResourcePBM.hasValue()){
      return this.graphicsService.graphicsResourcePBM.value();
    }
    return {labelsNombres:[],proyectosCuenta:[]};
  });

  dataLabelData2 = computed<Array<number> | undefined>(()=>{
    if(this.graphicsService.graphicsResourcePBM.hasValue()){
      return this.graphicsService.graphicsResourcePPF.value();
    }
    return [];
  });

  canvasProyectosPorUsuario = viewChild<ElementRef<HTMLCanvasElement>>('proyectosPorUsuarioChart');
  canvasProyectosPorFecha = viewChild<ElementRef<HTMLCanvasElement>>('proyectosPorFechaChart');



  //Metodos
  // ===========================
  // GRÁFICO 1: PROYECTOS POR MES (Línea)
  // ===========================
  public proyectosDataPorMes = computed(()=>{
    return {
      labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    datasets: [
      {
        label: 'Cantidad de Proyectos',
        data: this.dataLabelData2(),
        fill: true, // Cambié a true para una mejor visualización del área
        // 🚨 COLOR LÍNEA: Amarillo FabLab Sólido
        borderColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        // 🚨 COLOR FONDO: Amarillo FabLab Transparente
        backgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.2)`,
        tension: 0.4,
        pointBackgroundColor: `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 1)`,
        pointBorderColor: 'white',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],

    }
  })

  public proyectosPorMesConfig= computed(()=>{
    return{
        type: 'line',
        data: this.proyectosDataPorMes(),
        options: this.baseOptions('Cantidad de Proyectos por mes'),
    }
  });



  // ===========================
  // GRÁFICO 3: PROYECTOS POR USUARIO (Barras)
  // ===========================
  public proyectosPorUsuarioData = computed(()=>{
    return {
    labels: this.dataLabelsData().labelsNombres,
    datasets: [
      {
        label: 'Proyectos por Usuario',
        data: this.dataLabelsData().proyectosCuenta,
        // 🚨 COLOR BARRAS: Usaremos el amarillo FabLab en un array para simular la variedad
        backgroundColor: [
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.8)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.7)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.6)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.5)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.9)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.4)`,
          `rgba(${FABLAB_R}, ${FABLAB_G}, ${FABLAB_B}, 0.3)`,
        ],
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  })

  public proyectosPorUsuarioConfig = computed(()=>{
    return {
      type: 'bar',
      data: this.proyectosPorUsuarioData(),
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Proyectos por Usuario',
            // 🚨 Color del título del gráfico
            color: TEXT_COLOR,
            font: { size: 16, weight: 'bold' },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            // 🚨 Color de las etiquetas y líneas de grid
            ticks: { color: TEXT_COLOR },
            grid: { color: GRID_COLOR },
          },
          y: {
            ticks: { color: TEXT_COLOR },
            grid: { color: GRID_COLOR },
          },
        },
      },
  }
  });

  // ===========================
  // CONFIGURACIÓN BASE PARA LOS DEMÁS GRÁFICOS
  // ===========================
  baseOptions(label: string) {
    return {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            // 🚨 Color de la leyenda
            color: TEXT_COLOR,
            font: { size: 14 },
          },
        },
        title: {
          display: true,
          text: label,
          // 🚨 Color del título
          color: TEXT_COLOR,
          font: { size: 16, weight: 'bold' },
        },
      },
      scales: {
        x: {
          // 🚨 Color de las etiquetas y líneas de grid
          ticks: { color: TEXT_COLOR },
          grid: { color: GRID_COLOR },
        },
        y: {
          beginAtZero: true,
          ticks: { color: TEXT_COLOR },
          grid: { color: GRID_COLOR },
        },
      },
    };
  }

  constructor() {
    // ¡MODIFICADO! Este effect ahora crea y destruye el gráfico
    effect((onCleanup) => {
      // 1. Lee la config (como ya lo hacías)
      const config = this.proyectosPorUsuarioConfig();
      const config2 = this.proyectosPorMesConfig();


      // 2. Lee el signal del canvas
      const canvasEl = this.canvasProyectosPorUsuario();
      const canvasEl2 = this.canvasProyectosPorFecha();


      // 3. Si el canvas ya existe en el DOM...
      if (canvasEl) {
        // ...crea el gráfico
        const chart = new Chart(canvasEl.nativeElement, config as any);
        const chart2 = new Chart(canvasEl2!.nativeElement, config2 as any);


        // 4. Registra una "limpieza"
        // Esto se ejecuta ANTES de que el effect corra de nuevo,
        // o cuando el componente se destruye.
        onCleanup(() => {
          chart.destroy(); // Destruye el gráfico anterior
          chart2.destroy();
        });
      }
    });
  }

  //Metodos
  loadPPUData(){
    if(this.loadingData()){
      return;
    }
    this.loadingData.set(true);

    this.graphicsService.loadCsvFromPBU().subscribe(()=>{
      this.loadingData.set(false);
      this.notificacionsStatusService.showMessage();
    })
  }

}
