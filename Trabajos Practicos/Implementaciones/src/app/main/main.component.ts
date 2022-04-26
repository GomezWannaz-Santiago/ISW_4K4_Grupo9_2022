import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  formGeneral : FormGroup;

  constructor(fb : FormBuilder) { 
    this.formGeneral = fb.group({});
  }

  ngOnInit(): void {
  }

  nextStep(){

  }

}
