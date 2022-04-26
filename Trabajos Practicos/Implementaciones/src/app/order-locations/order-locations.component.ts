import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-locations',
  templateUrl: './order-locations.component.html',
  styleUrls: ['./order-locations.component.css']
})
export class OrderLocationsComponent implements OnInit {

  formGeneral : FormGroup;
  errorComercio : any  ={value :  true};
  errorDomicilio : any ={value :  true};

  constructor(fb : FormBuilder, private router : Router) {
    console.log(history.state)

    this.formGeneral = fb.group({
      formOrderDesc : [''],
      tiempoEntrega : [''],
      formUbicaciones : ['']
    })

    this.formGeneral.controls['formOrderDesc'].setValue(history.state.form.formOrderDesc)
    this.formGeneral.controls['tiempoEntrega'].setValue(history.state.form.tiempoEntrega)
    
    let formUbicaciones = fb.group({
      domicilio : [''],
      comercio : ['']
    })
    this.formGeneral.controls['formUbicaciones'].setValue(formUbicaciones)

    console.log(this.formGeneral);

   }

  ngOnInit(): void {
  }

  nextStep(){
    if(this.errorComercio.value || this.errorDomicilio.value){
      console.log("errorComercio" + this.errorComercio.value)
      console.log("errorDomicilio" + this.errorDomicilio.value)
      return;
    }
    console.log(this.formGeneral.controls)
    console.log(this.formGeneral.value)
    console.log("formOrderDesc :")
    console.log(this.formGeneral.value.formOrderDesc)
    console.log("formUbicaciones")
    console.log(this.formGeneral.value.formUbicaciones.value)
    console.log("tiempoEntrega :")
    console.log( this.formGeneral.value.tiempoEntrega)


    //Debido al límite de longitud del history, hay que pasar los valores directamente en lugar de el form
    this.router.navigateByUrl('/payment-method',
     {state:{form: { formOrderDesc : this.formGeneral.value.formOrderDesc, 
                     formUbicaciones : {
                      domicilio :  this.formGeneral.value.formUbicaciones.value.domicilio.value,
                      comercio : this.formGeneral.value.formUbicaciones.value.comercio.value
                     },
                     tiempoEntrega : this.formGeneral.value.tiempoEntrega 
                    }
            }
      })
    
    }


  changeError(valor : boolean, objetoError : any) {
    objetoError.value = valor;

  }

  patchForm(form : FormGroup, control : any){
    control.setValue(form);
  }

  previousStep(){
    history.back();
  }

}
