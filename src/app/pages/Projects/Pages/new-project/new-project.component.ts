import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectsService } from '../../../../services/projects.service';
import { ProjectsInterface } from '../../../../interfaces/projects.interface';
import { NotificacionsStatusService } from '../../../../services/notificacionsStatus.service';
import { ProjectsCreateInterface } from '../../../../utils/request-interfaces/projectsCreateInterface';
import { AuthService } from '../../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'new-project',
  templateUrl: './new-project.component.html',
  imports: [
      ReactiveFormsModule,
    ],
})
export class NewProjectComponent {

  //Inyeccion de servicios
  proyectsService = inject(ProjectsService);
  formbuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  notificacionStatus = inject(NotificacionsStatusService);


  //Atributos
  //TODO: Igualar validadores a los del backend
  newProjectForm: FormGroup = this.formbuilder.group({
    titulo: ["",[Validators.required,Validators.minLength(5)]],
    descripcionproyecto: ["",[Validators.required,Validators.maxLength(500)]],
    categoria: ["",[Validators.required]],
    areaaplicacion: ["",[Validators.required]],
    fechainicio: [""]
  })


  submitNewProject(): void{
    if(this.newProjectForm.invalid){
      this.newProjectForm.reset();
      return;
    }

    //Creacion de proyecto
    const newProject: ProjectsCreateInterface = this.newProjectForm.value;
    newProject.ids = [this.authService.userData()?.id!];


    //Ejecucion de observable y activacion de estado de insercion
    this.proyectsService.postProject(newProject)
    .subscribe((status)=>{
      if(status){
        console.log(this.notificacionStatus.statusTextMessage());
        this.notificacionStatus.showMessage();
        this.router.navigateByUrl("/proyectos");
        return;
      }
      console.log(this.notificacionStatus.statusErrorMessage());
      this.notificacionStatus.showMessage();
      this.router.navigateByUrl("/proyectos");
    });


  }

}
