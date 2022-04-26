import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  descripcion : string = "Descripción";
  imagen : any = "Acá va la imagen";
  tiempoRecepcion : string = "Tiempo de recepción";
  domicilioEntrega : string = "domicilio de entrega";
  domicilioBusqueda : string = "domicilio búsqueda";
  formaPago : string = "";

  constructor(private router : Router) {

    let form = history.state.form
        

    this.descripcion = form.formOrderDesc.descripcion;
    debugger;
    let imagen = form.formOrderDesc.imagen
    if(imagen != ''){
      let index : number = imagen.search("fakepath");
      this.imagen = index != -1 ? imagen.slice(index + 9 , imagen.length) : '';
    }
    

    this.tiempoRecepcion = form.tiempoEntrega.fechaRadio === '0'? "Lo antes posible" : "Fecha: " + form.tiempoEntrega.fecha + " A las " + form.tiempoEntrega.hora;

    let formUbicaciones = form.formUbicaciones
    this.domicilioEntrega = formUbicaciones.domicilio.mapa == 'coordinates'? "Ver Mapa" : "Ciudad: "+ formUbicaciones.domicilio.ciudad + " Calle: " + formUbicaciones.domicilio.calle + formUbicaciones.domicilio.numeroCalle + " Referencia: " + formUbicaciones.domicilio.referencia;
    this.domicilioBusqueda = formUbicaciones.comercio.mapa == 'coordinates'? "Ver Mapa" : "Ciudad: "+ formUbicaciones.comercio.ciudad + " Calle: " + formUbicaciones.comercio.calle + formUbicaciones.comercio.numeroCalle + " Referencia: " + formUbicaciones.comercio.referencia;

    let formMetodoPago = form.formMetodoPago;
    this.formaPago = formMetodoPago.montoEfectivo? "Efectivo" : "Tarjeta"



   }

  ngOnInit(): void {
  }


  confirm(){
    this.router.navigateByUrl('/finish-page', {state:{value:true}});    
  }

  cancel(){
    this.router.navigateByUrl('/finish-page', {state:{value:false}});
  }

  

}
