import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { CategoriaDeleteDialogComponent } from '../categoria-delete-dialog/categoria-delete-dialog.component';

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

  dialogRef: MatDialogRef<CategoriaDeleteDialogComponent>;

  constructor(private service: CategoriaService, private route: ActivatedRoute, 
              private router: Router, private toastr: ToastrService, public dialog: MatDialog) {}

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

  openDialog(): void {
    this.dialogRef = this.dialog.open(CategoriaDeleteDialogComponent, {
      data: {
        titulo: this.categoria.nome,
      }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if(result){
      this.delete();
      }
    });
  }


  delete(): void {
    this.service.delete(this.categoria.id).subscribe((response) => {
      this.router.navigate(['categorias']);
      this.toastr.success('Categoria ' + (this.categoria.nome).toUpperCase() + ' removida com sucesso!', 'Remoção', {timeOut: 6000});
    }, err => {
      this.toastr.error(err.error.error, 'Erro', {timeOut: 6000});
    });
  }

}
