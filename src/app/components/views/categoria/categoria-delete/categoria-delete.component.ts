import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) {}

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

  delete(): void {
    this.service.delete(this.categoria.id).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.toastr.warning('Categoria ' + (this.categoria.nome).toUpperCase() + ' removida com sucesso!', 'Remoção', {timeOut: 6000});
    }, err => {
      this.toastr.error(err.error.error, 'Erro', {timeOut: 6000});
    });
  }

}
