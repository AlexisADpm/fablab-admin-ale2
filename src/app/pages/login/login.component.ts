import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
})
export class LoginComponent {
  isLoginView: boolean = true;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
  };

  userLogin: any = {
    emailId: '',
    password: '',
  };

  router = inject(Router);

  onRegister() {
    const isLocalData = localStorage.getItem('localData');
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('localData', JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('localData', JSON.stringify(localArray));
    }
    alert('Registro exitoso');
  }

  onLogin() {
    const isLocalData = localStorage.getItem('localData');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (m: any) =>
          m.emailId == this.userLogin.emailId &&
          m.password == this.userLogin.password
      );
      if (isUserFound != undefined) {
        this.router.navigateByUrl('layout');
      } else {
        alert('Correo o contraseña incorrecta');
      }
    } else {
      alert('Usuario no encontrado');
    }
  }
}
