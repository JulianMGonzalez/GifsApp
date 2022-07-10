import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') textBuscar!:ElementRef<HTMLInputElement>

  buscar(){

    const busqueda = this.textBuscar.nativeElement.value

    if(busqueda.trim().length == 0){
      return
    }
    this.gifService.buscarGifs(busqueda)


    this.textBuscar.nativeElement.value = ''
  }

  constructor(private gifService: GifsService){

  }

}
