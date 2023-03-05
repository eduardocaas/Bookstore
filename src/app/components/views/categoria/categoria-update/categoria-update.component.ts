import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit{

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor (private service: CategoriaService, private route: ActivatedRoute) {}

  nome: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]);
  descricao: FormControl = new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(300)]);

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id).subscribe((response) => {
      this.categoria.nome = response.nome;
      this.categoria.descricao = response.descricao;
    });
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
