import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/models/livro';
import { LivroService } from 'src/app/services/livro.service';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  id_cat: any = '';

  ELEMENT_DATA: Livro[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'ler_livro', 'acoes'];
  dataSource = new MatTableDataSource<Livro>(this.ELEMENT_DATA);

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: LivroService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat');
    this.findAll();
  }

  findAll(): void {
    this.service.findAllCategoria(this.id_cat).subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Livro>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

}
