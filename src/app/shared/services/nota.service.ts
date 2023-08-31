import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nota } from '../interfaces/nota';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private readonly API = 'nota';


  constructor(private http: HttpClient) { }


  listarNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.API);
  }


  getById(id: number): Observable<Nota> {
    return this.http.get<Nota>(`${this.API}/${id}`);
  }
}
