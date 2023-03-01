import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

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

  constructor(private toast: ToastrService, private service: CategoriaService, private router: Router) {}

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  descricao: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]);
  
  create(): void {
    this.service.create(this.categoria).subscribe(response => {
      this.toast.success("Categoria " + (this.categoria.nome).toUpperCase() + ' criada com sucesso!', 'Cadastro', {timeOut: 6000});
      this.router.navigate(['categorias']);
    }, err => {
      for(let i = 0; i < err.error.errors.length; i++){
        this.toast.error(err.error.errors[i].message);
      }
    });
  }

  clearFields(): void {
    this.categoria.nome = '';
    this.categoria.descricao = '';
  }

  validFields(): boolean {
    return this.nome.valid && this.descricao.valid;
  }

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
