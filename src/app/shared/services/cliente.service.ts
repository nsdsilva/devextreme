import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = 'cliente';



  constructor(private http: HttpClient) { }



  listaClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }



  salvarClientes(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API , cliente);
  }

  alteraClientes(cliente: Cliente) {
    return this.http.put<Cliente>(`${this.API}/${cliente.id}`, cliente);
  }
}
