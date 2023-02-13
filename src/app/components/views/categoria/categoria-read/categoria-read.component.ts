import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';


@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})

export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = [];
  data = new MatTableDataSource<Categoria>(this.categorias);

  colunas: string[] = ['id', 'nome', 'descricao', 'acoes'];

  constructor(private service: CategoriaService) { }

  ngOnInit(): void {
      this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      console.log("resposta");
      this.categorias = resposta;

    })
  }

}
