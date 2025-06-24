import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'graphics',
  imports: [BrowserModule],
  templateUrl: './graphics.component.html',
})
@Component({
  selector: 'app-project-chart',
  templateUrl: './project-chart.component.html',
})
export class ProjectChartComponent {
  // Simulación de datos agrupados por categoría
  categorias = ['impresion 3D', 'electronica', 'corte laser', 'mixto'];
  cantidades = [1, 3, 1, 1]; // Cuenta manual basada en tu JSON

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.categorias,
    datasets: [
      {
        data: this.cantidades,
        label: 'Proyectos por categoría',
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'],
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };
}
