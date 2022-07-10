import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _servicioUrl:string = 'https://api.giphy.com/v1/gifs/'
  private _apiKey:string = 'TGbBgVZ8UwItRGGc5Orcb7QoHhPgMxlO'
  private _historial: string[] =  []


  //cambiar el any
  public resultados: Data[] = []

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('buscados')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs( query: string ) {

    query = query.trim().toLowerCase()

    if( !this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem('buscados', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', query)
    .set('limit', '20')
    .set('offset', '0')
    .set('lang', 'en');

    this.http.get<SearchGifsResponse>(`${this._servicioUrl}search`, {
      params
    })
      .subscribe( (res )=> {
        this.resultados = res.data
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })


  } 


}
