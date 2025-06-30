import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  obtenerUsuarios() {
    console.log('UsersService: obtenerUsuarios ejecutado');
  }

  agregarUsuario(usuario: any) {
    console.log('UsersService: agregarUsuario ejecutado', usuario);
  }

  editarUsuario(id: number) {
    console.log('UsersService: editarUsuario ejecutado', id);
  }

  eliminarUsuario(id: number) {
    console.log('UsersService: eliminarUsuario ejecutado', id);
  }
}
