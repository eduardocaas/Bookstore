import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }

  findById(id: String): Observable<Categoria> {
    return this.http.get<Categoria>(`${environment.baseUrl}/categorias/${id}`);
  }

  findAll():Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.baseUrl}/categorias`);
  }

  create(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(`${environment.baseUrl}/categorias`, categoria);
  }

  delete(id: String): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/categorias/${id}`);
  }

}
