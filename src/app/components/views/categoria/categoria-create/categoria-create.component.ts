import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/categoria';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent{

  categoria: Categoria = {
    nome: '',
    descricao: ''
  };

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  descricao: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]);
  

  getErrorMessageNome(){
    if(this.nome.hasError('required')) {
      return 'Você deve informar um nome';
    }
    if(this.nome.hasError('minlength')) {
      return 'O nome deve ter no mínimo 2 caracteres';
    }
    if(this.nome.hasError('maxlength')) {
      return 'O nome deve ter no máximo 50 caracteres';
    }
    return null;
  }

  getErrorMessageDescricao(){
    if(this.descricao.hasError('required')){
      return 'Você deve informar uma descriçao';
    }
    if(this.descricao.hasError('minlength')){
      return 'O descrição deve ter no mínimo 2 caracteres';
    }
    if(this.descricao.hasError('maxlength')){
      return 'O descrição deve ter no máximo 300 caracteres';
    }
    return null;
  }

}
