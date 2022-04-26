import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  pagoEfectivo : boolean = false;
  pagoTarjeta : boolean = false;
  costoEnvio : number = 50;

  formGeneral : FormGroup;
  paymentMethodForm : any;
  errorGeneral : boolean = false;



  constructor(fb : FormBuilder, private router : Router) { 
    this.paymentMethodForm = fb.group({
      montoEfectivo : [''],
      numeroTarjeta : [''],
      nombreTarjeta : [''],
      fechaVencimiento : [''],
      cvc : ['']
    })

    this.formGeneral = fb.group({
      formOrderDesc : [''],
      formUbicaciones : [''],
      tiempoEntrega : ['']
    })

    this.formGeneral.patchValue(history.state.form);
    console.log(this.formGeneral);

    this.calculateShippingCost();

  }

  ngOnInit(): void {
  }

  seleccionarPagoEfectivo() {
    this.pagoEfectivo = true;
    this.pagoTarjeta = false;
  }

  seleccionarPagoTarjeta() {
    this.pagoEfectivo = false;
    this.pagoTarjeta = true;
  }

  verifyPositiveAmount(amount : number) : boolean {
    return amount > 0 && amount >= this.costoEnvio
  }

  /**
   * Verifica el numero de la tarjeta
   * @param controlForm controlForm que contiene al número de tarjeta
   * @returns true si el número de tarjeta tiene el formato correcto, false caso contrario
   */
  verifyCardNumber(controlForm : any) : boolean{
    if(controlForm.value == null){     
      return false;
    }      

    return controlForm.value.toString().slice(0,1) == '4' && controlForm.value.toString().length >= '13' && controlForm.value.toString().length <= '18'
  }

  verifyIsCompleted(controlForm : any) : boolean {
    return controlForm.value != null && controlForm.value != ''    
}

  nextStep(){
    this.errorGeneral = false;
    let b = false;    
    if(this.pagoEfectivo){       
      console.log("Pago efectivo")     
      b = this.verifyIsCompleted(this.paymentMethodForm.controls['montoEfectivo']) &&  this.verifyPositiveAmount(this.paymentMethodForm.controls['montoEfectivo'].value);      
    
    }
    else { 
      b = this.verifyCardForm();      
    }

    if (b) {

    this.formGeneral.addControl('formMetodoPago',this.paymentMethodForm);
    this.formGeneral.patchValue(this.paymentMethodForm.value);

    this.router.navigateByUrl('/order-detail',
    {state:{form: { formOrderDesc : this.formGeneral.value.formOrderDesc, 
                    formUbicaciones : {
                     domicilio :  this.formGeneral.value.formUbicaciones.domicilio,
                     comercio : this.formGeneral.value.formUbicaciones.comercio
                    },
                    tiempoEntrega : this.formGeneral.value.tiempoEntrega ,
                    formMetodoPago : this.formGeneral.value.formMetodoPago
                   }

           }
     })    

    }
    else {
      this.errorGeneral = true;
    }
  }

  placeDateSlash(){
    if(this.paymentMethodForm.controls['fechaVencimiento'].value.length == 2){
      this.paymentMethodForm.controls['fechaVencimiento'].setValue(this.paymentMethodForm.controls['fechaVencimiento'].value + '/');
    }
  }


  verifyCardForm(){
    let bandera = true;

    let controles = this.paymentMethodForm.controls;

    bandera = bandera && this.verifyCardNumber(controles['numeroTarjeta']);
    bandera = bandera && this.verifyIsCompleted(controles['nombreTarjeta'])
    bandera = bandera && this.verifyIsCompleted(controles['fechaVencimiento']) && this.verifyDateFormat(controles['fechaVencimiento'].value);
    console.log("bandera fecha" + this.verifyDateFormat(controles['fechaVencimiento'].value))
    bandera = bandera && this.verifyIsCompleted(controles['cvc'])
    console.log("bandera cvc" + bandera)

    return bandera;
  }

  verifyDateFormat(date : string) : boolean{
    let mes = date.slice(0,2);
    let anio = date.slice(3,5);
    console.log("anio");
    try {
      return Number.parseInt(mes) <= 12 && Number.parseInt(mes) >= 1 && Number.parseInt(anio) >= 22

    }
    catch{
      return false;
    }
  }

  previousStep(){
    history.back();
  }

  calculateShippingCost(){ 

    let ubicaciones = this.formGeneral.controls['formUbicaciones'].value
    console.log(this.formGeneral.controls['formUbicaciones'].value);
    let ciudadComercio;
    let ciudadDomicilio;
    
     // Lo lógico sería buscar direcciones o coordenadas en una API y dsp calcular la distancia

    ciudadComercio = ubicaciones.comercio.mapa == 'coordinates'? "Cordoba" : ubicaciones.comercio.ciudad ;
    ciudadDomicilio = ubicaciones.domicilio.mapa == 'coordinates'? "Cordoba" : ubicaciones.domicilio.ciudad;
    

    if(ciudadComercio == ciudadDomicilio ){
      this.costoEnvio = 100;
    }
    else {
      this.costoEnvio = 140;
    }

  }

}
