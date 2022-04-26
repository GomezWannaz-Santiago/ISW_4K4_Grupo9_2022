import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  @Input() formGeneral : any;
  @Output() error = new EventEmitter<boolean>();
  @Output() form = new EventEmitter<any>();


  verMapa : boolean = false;
  modoEleccion : string = "Elegir en el mapa";
  opcionSelecc : string ;
  locationForm : FormGroup;
  errorCalle : any = {value : false};
  errorNumero : any = {value : false};
  errorCiudad : any = {value : false};
  

  constructor(fb : FormBuilder) {
    this.locationForm = fb.group({
      calle : [''],
      numeroCalle : [''],
      ciudad : [''],
      mapa : [''],
      referencia : ['']

    })
    this.opcionSelecc = "0";
   }

  ngOnInit(): void {
  }

  activateMap(){
    this.verMapa = !this.verMapa;
    this.modoEleccion = this.modoEleccion == "Elegir en el mapa" ? "Volver" : "Elegir en el mapa"
    this.emitForm();
  }

/**
 * Si el campo no está completo, muestra un error
 * @param controlForm FormControl que tiene que estar completo
 * @param objetoError Objeto que contiene la referencia del error a mostrar
 */

  verifyIsCompleted(controlForm : any, objetoError : any) {
    if(controlForm.value != null && controlForm.value != '') {
      objetoError.value = false;
    }
    else{      
      objetoError.value=  true;       
    }      

  }

  emitForm(){

    // If utilizado para simular el clickeo en el mapa
    if(this.verMapa){    
      this.locationForm.controls['mapa'].setValue('coordinates');
      this.error.emit(false);   
    }
    else {

      let controlesForm = this.locationForm.controls;
      this.verifyIsCompleted(controlesForm['calle'], this.errorCalle);
      this.verifyIsCompleted(controlesForm['numeroCalle'], this.errorNumero);
      this.verifyIsCompleted(controlesForm['ciudad'], this.errorCiudad);
        

      if(this.errorCalle.value || this.errorNumero.value || this.errorCiudad.value){        
        this.error.emit(true)
      }
      else {        
        this.error.emit(false)
      }
      
    }

    this.form.emit(this.locationForm); 
    
  }

}
