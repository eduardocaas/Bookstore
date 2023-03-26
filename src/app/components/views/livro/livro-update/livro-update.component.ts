import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  btnVal: string = 'Limpar';

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  constructor(private route: ActivatedRoute, private service: LivroService, private toastr: ToastrService, private router: Router) {}

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

  update(): void {
    this.service.update(this.livro).subscribe(response =>{
      this.toastr.success('Livro ' + (this.livro.titulo).toUpperCase() + ' atualizado com sucesso' , 'Atualização', {timeOut: 6000});
      this.router.navigate(['categorias/' + this.id_cat + '/livros']);
    }, err => {
      if(err.error.errors){
        for(let i = 0; i < err.error.errors.length; i++){
          this.toastr.error(err.error.errors[i].message, 'Erro', {timeOut: 6000});
        }
      }
      else {
        this.toastr.error(err.error.message, 'Erro', {timeOut: 6000});
      }
    });
  }

  clearFields(): void {
    if(this.clear){
      this.livro.titulo = '';
      this.livro.nome_autor = '';
      this.livro.texto = '';
      this.clear = false;
      this.btnVal = "Dados";
    }
    else{
      this.findById();
      this.clear = true;
      this.btnVal = "Limpar";
    }
  }

  validFields(): boolean {
    return (this.titulo.valid && this.titulo.value.length >= 2 && this.titulo.value.length <= 50) && 
           (this.autor.valid && this.autor.value.length >= 2 && this.autor.value.length <= 50) &&
           (this.texto.valid && this.texto.value.length >= 2 && this.texto.value.length <= 1000);
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

  getErrorMessageAutor() {
    if(this.autor.hasError('required')){
      return "Você deve informar um nome de autor";
    }
    if(this.autor.hasError('minlength')){
      return "O título deve ter no mínimo 2 caracteres";
    }
    if(this.autor.hasError('maxlength')){
      return "O título deve ter no máximo 50 caracteres";
    }
    return "Erro";
  }

  getErrorMessageTexto() {
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
