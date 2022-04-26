import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.css']
})
export class FinishPageComponent implements OnInit {

  titulo : string = "";
  bandera : boolean;

  constructor(private router : Router) {

    this.bandera = history.state.value

    this.titulo = this.bandera? "confirmado" : "cancelado"

   }

  ngOnInit(): void {
  }


  backToHomePage(){
    console.log(history)  
    this.router.navigateByUrl('/')    
  }
}
