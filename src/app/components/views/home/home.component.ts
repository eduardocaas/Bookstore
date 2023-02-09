import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  texto1 = `Projeto de aplicação WEB que visa exemplificar um sistema CRUD usando um modelo de catálogo de livros.`;
  texto2 = `Tecnologias utilizadas: Spring (Back-End), Angular (Front-End)`;

}
