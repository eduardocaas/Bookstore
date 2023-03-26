import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livro } from '../models/livro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Livro> {
    return this.http.get<Livro>(`${environment.baseUrl}/livros/${id}`);
  }

  findAllCategoria(id_cat: any): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${environment.baseUrl}/livros/categoria/${id_cat}`);
  }

  create(livro: Livro, id_cat: Number): Observable<Livro> {
    return this.http.post<Livro>(`${environment.baseUrl}/livros?categoria=${id_cat}`, livro);
  }

  update(livro: Livro): Observable<Livro> {
    return this.http.put<Livro>(`${environment.baseUrl}/livros/${livro.id}`, livro);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}/livros/${id}`);
  }

}
