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

  findAllCategoria(id_cat: any): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${environment.baseUrl}/livros/categoria/${id_cat}`);
  }
}
