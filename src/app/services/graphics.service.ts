import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable } from 'rxjs';
import { ProjectsByUser } from '../interfaces/graphicsInterfaces/projectsByUser.interface';

@Injectable({providedIn: 'root'})
export class GraphicsService {

  httpClient = inject(HttpClient);



  graphicsResource = rxResource({
    loader: () => this.getGraphicsProjectsByUser()
  })



  getGraphicsProjectsByUser(): Observable<ProjectsByUser>{
    return this.httpClient.get<ProjectsByUser>(`https://fablabwebapi20251104221404-crbeb0b9cafvhqg3.canadacentral-01.azurewebsites.net/api/graficos/proyectoporusuario`)
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





}
