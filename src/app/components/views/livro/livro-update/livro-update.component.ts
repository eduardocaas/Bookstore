import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})

export class LivroUpdateComponent implements OnInit{

  id_cat: any = '';
  public clear: boolean = true;
  public btn = document.getElementById('btn');

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private route: ActivatedRoute, private service: LivroService) {}

  titulo: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  autor: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  texto: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]);

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.livro.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.livro.id).subscribe(response => {
      this.livro.titulo = response.titulo;
      this.livro.nome_autor = response.nome_autor;
      this.livro.texto = response.texto;
    });
  }

  clearFields(): void {
    if(this.clear){
      this.livro.titulo = '';
      this.livro.nome_autor = '';
      this.livro.texto = '';
      this.clear = false;
    }
    else{
      this.findById();
      this.clear = true;
    }
  }

  validFields(): boolean {
    return (this.titulo.valid && this.titulo.value.length >= 2 && this.titulo.value.length <= 50) && 
           (this.autor.valid && this.autor.value.length >= 2 && this.autor.value.length <= 50) &&
           (this.texto.valid && this.texto.value.length >= 2 && this.texto.value.length <= 1000);
  }

}
