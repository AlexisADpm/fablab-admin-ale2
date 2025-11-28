import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { ChatIAResponseInterface } from '../utils/responses-interfaces/chatIAResponse';

@Injectable({providedIn: 'root'})
export class ChatBotIAService {

  //Servicios
  httpclient = inject(HttpClient);
  loadingMessage = signal<boolean>(false);

  postChatMessage(question: string): Observable<ChatIAResponseInterface | null>{
    if(!question){
      return of(null);
    }
    //Cargando
    this.loadingMessage.set(true)


    return this.httpclient.post<ChatIAResponseInterface>("https://fablabwebapi20251104221404-crbeb0b9cafvhqg3.canadacentral-01.azurewebsites.net/api/chatia",question).pipe(
      map((response)=> {
        return response;
      }),
      catchError((err)=> {
        console.log(err);
        return of(null);
      }),
      finalize(()=> this.loadingMessage.set(false)),
    )

  }

}
