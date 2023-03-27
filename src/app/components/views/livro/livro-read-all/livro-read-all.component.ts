import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';
import { LivroDialogComponent } from '../livro-dialog/livro-dialog.component';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/models/categoria';


@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  id_cat: any = '';

  ELEMENT_DATA: Livro[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'ler_livro', 'acoes'];
  dataSource = new MatTableDataSource<Livro>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: LivroService, private route: ActivatedRoute, public dialog: MatDialog, private cat_service: CategoriaService) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findAll();
    this.findById_cat();
  }

  findById_cat(): void {
    this.cat_service.findById(this.id_cat).subscribe(response => {
      this.categoria.nome = response.nome;
    })
  }

  findAll(): void {
    this.service.findAllCategoria(this.id_cat).subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Livro>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(id: any): void {
    this.service.findById(id).subscribe(response => {
      this.livro.titulo = response.titulo;
      this.livro.nome_autor = response.nome_autor;
      this.livro.texto = response.texto;
      this.dialog.open(LivroDialogComponent, {
        data: {
          titulo: this.livro.titulo,
          nome_autor: this.livro.nome_autor,
          texto: this.livro.texto
        }
      });
    })
  }

}
