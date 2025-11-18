import { Component, ElementRef, inject, input, Renderer2, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChatBotIAService } from '../../services/chatbotIa.service';
import { ChatIAResponseInterface } from '../../utils/responses-interfaces/chatIAResponse';

@Component({
  selector: 'app-chatbot-component',
  imports: [ReactiveFormsModule],
  templateUrl: './chatbot-component.component.html',
})
export class ChatbotComponentComponent {

  //Servicios
  renderer2 = inject(Renderer2);
  formBuilder = inject(FormBuilder);
  chatbotIAService = inject(ChatBotIAService);

  //Atributos
  openChatBot = signal<boolean>(false);
  loading = signal<boolean>(false);

  //Referencias del DOM
  iaMessage = viewChild<ElementRef<HTMLDivElement>>('iaMessage');
  containerChat = viewChild<ElementRef<HTMLDivElement>>('containerChat');
  userMessage = viewChild<ElementRef<HTMLDivElement>>('userMessage');

  //Formularios
  fbUserMessage:FormGroup = this.formBuilder.group({
    "Pregunta":[""]
  })



  ngAfterView(){
    console.log(this.iaMessage());
  }

  //Metodos
  openChatBotView(){
    (this.openChatBot())?this.openChatBot.set(false):this.openChatBot.set(true);
  }

  postUserMessage(){
    if(this.loading()){
      return;
    }

    this.AddUserMessageChat(this.fbUserMessage.controls["Pregunta"].value);
    this.loading.set(true);

    const fbValue = this.fbUserMessage.value;
    this.fbUserMessage.reset();


    this.chatbotIAService.postChatMessage(fbValue)
    .subscribe((resp)=>{
      if(resp){
        this.AddIAMessageChat(resp.respuesta);
        this.loading.set(false);

        return;
      }
      this.loading.set(false);
      this.AddIAMessageChat("La IA se encuentra sobrecargada estos momentos");

    })

  }


  AddIAMessageChat(respuesta: string){
    const nodoClonado = this.iaMessage()?.nativeElement.cloneNode(true) as HTMLElement;
    //Mensaje de la IA
    let mensajeP = nodoClonado.querySelector("p");

    if(mensajeP){
      mensajeP.innerText = respuesta;
    }
    this.containerChat()?.nativeElement.appendChild(nodoClonado!);

  }

  AddUserMessageChat(question:string){
    const nodoClonado = this.userMessage()?.nativeElement.cloneNode(true) as HTMLElement;
    this.renderer2.removeClass(nodoClonado,"hidden");
    this.renderer2.addClass(nodoClonado,"flex");

    //Mensaje de la IA
    let mensajeP = nodoClonado.querySelector("p");

    if(mensajeP){
      mensajeP.innerText = question;
    }
    this.containerChat()?.nativeElement.appendChild(nodoClonado!);

  }

}
