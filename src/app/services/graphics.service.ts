import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of } from 'rxjs';
import { ProjectsByUser } from '../interfaces/graphicsInterfaces/projectsByUser.interface';
import { environment } from '../../environments/environments';
import { ProjectsByMonthResponse } from '../utils/responses-interfaces/proyectsByMonth';
import { projectsByYear } from '../utils/customFunctions/graphicsFunction';
import { NotificacionsStatusService } from './notificacionsStatus.service';



@Injectable({providedIn: 'root'})
export class GraphicsService {

  //Servicios
  httpClient = inject(HttpClient);
  notificacionsStatusService = inject(NotificacionsStatusService);



  private baseUrl = `${environment.apiKey}/api/graficos`;

  graphicsResourcePBM = rxResource({
    loader: () => this.getGraphicsProjectsByUser()
  })

  graphicsResourcePPF = rxResource({
    loader: () => this.getGraphicsProjectsByMonth()
  })



  getGraphicsProjectsByUser(): Observable<ProjectsByUser>{
    return this.httpClient.get<ProjectsByUser>(`${this.baseUrl}/proyectoporusuario`)
    .pipe(
      map((data)=> {
        return data;
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        return [];
      })
    );
  }

  getGraphicsProjectsByMonth(): Observable<Array<number>>{
    return this.httpClient.get<ProjectsByMonthResponse[]>(`${this.baseUrl}/proyectoporfecha`)
    .pipe(
      map((data)=> {
        console.log(projectsByYear(data));
        return projectsByYear(data);
      }),
      //TODO: Implementar interfaz de error en base a asp net
      catchError((err)=>{
        return [];
      })
    );
  }

  //Cargar data de graficos en csv
  loadCsvFromPBU():Observable<boolean>{
    return this.httpClient.post<ProjectsByMonthResponse[]>(`${this.baseUrl}/actualizar-csv-ppu`,{})
    .pipe(
      map((data)=> {
        this.notificacionsStatusService.statusTextMessage.set("Datos cargados correctamente");
        this.notificacionsStatusService.statusMessage.set(true);
        return true;
      }),
      catchError((err)=>{
        this.notificacionsStatusService.statusErrorMessage.set("Hubo un problema al ingresar los datos");
        this.notificacionsStatusService.statusMessage.set(true);
        return of(false);
      })
    );

  }







}
