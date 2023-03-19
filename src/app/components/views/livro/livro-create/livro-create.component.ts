import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit{

  id_cat: any = '';

  livro: Livro = {
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private service: LivroService, private route: ActivatedRoute, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
  }

  titulo: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  nome_autor: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  texto: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]);

  create(): void {
    this.service.create(this.livro, this.id_cat).subscribe(response => {
      this.toastr.success('Livro ' + (this.livro.titulo).toUpperCase() + ' criado com sucesso', 'Cadastro', {timeOut: 6000});
      this.clearFields();
      this.resetValidators();
    }, err => {
      if(err.error.errors){
        for(let i = 0; i < err.error.errors.length; i++){
          this.toastr.error(err.error.errors[i].message);
        }
      } else {
        this.toastr.error(err.error.message, 'Erro', {timeOut: 6000});
      }
    });
  }

  clearFields(): void {
    this.livro.titulo = '';
    this.livro.nome_autor = '';
    this.livro.texto = '';
  }

  resetValidators(): void {
    this.titulo.clearValidators();
    this.titulo.updateValueAndValidity();
    this.nome_autor.clearValidators();
    this.nome_autor.updateValueAndValidity();
    this.texto.clearValidators();
    this.texto.updateValueAndValidity();
  }

  validFields(): boolean {
    return this.titulo.valid && this.nome_autor.valid && this.texto.valid && 
    (this.titulo.value.length >= 2) && (this.nome_autor.value.length >= 2) && (this.texto.value.length >= 2);
  } 

  getErrorMessageTitulo() {
    if(this.titulo.hasError('required')){
      return "Você deve informar um título";
    }
    if(this.titulo.hasError('minlength')){
      return "O título deve ter no mínimo 2 caracteres";
    }
    if(this.titulo.hasError('maxlength')){
      return "O título deve ter no máximo 50 caracteres";
    }
    return "Erro";
  }

  getErrorMessageAutor(){
    if(this.nome_autor.hasError('required')){
      return "Você deve informar o nome do autor";
    }
    if(this.nome_autor.hasError('minlength')){
      return "O nome do autor deve ter no mínimo 2 caracteres";
    }
    if(this.nome_autor.hasError('maxlength')){
      return "O nome do autor deve ter no máximo 50 caracteres";
    }
    return "Erro";
  }

  getErrorMessageTexto(){
    if(this.texto.hasError('required')){
      return "Você deve informar uma descrição";
    }
    if(this.texto.hasError('minlength')){
      return "A descrição deve ter no mínimo 2 caracteres";
    }
    if(this.texto.hasError('maxlength')){
      return "A descrição deve ter no máximo 1000 caracteres";
    }
    return "Erro";
  }

}
