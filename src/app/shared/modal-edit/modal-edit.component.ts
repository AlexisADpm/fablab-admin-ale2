import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-edit.component.html',
  styles: ``
})
export class ModalEditComponent implements OnInit{

  //Servicios
  FormBuilder = inject(FormBuilder);

  //Atributos
  fbEdit= input<FormGroup>();
  fbEditSend = output<FormGroup>();
  closeModal = output<boolean>();

  ngOnInit(){
    console.log(this.fbEdit()?.value);
  }

  //Metodos

  //Emision de formularios
  emitForm(): void{
    this.fbEditSend.emit(this.fbEdit()?.value);
    this.fbEdit()?.reset();
  }

  //Llaves de form
  formKeys(fb: FormGroup): Array<String>{
    return Object.keys(fb.controls);
  }

  //Todo: crear boton de cerrar, emitir valor false


}
