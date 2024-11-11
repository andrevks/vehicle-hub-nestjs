import { Injectable } from '@angular/core'
import { environment } from '../../environments/enviroment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Vehicle {
  id: number
  placa: string
  chassi: string
  renavam: string
  modelo: string
  marca: string
  ano: number
  createdAt: Date
  updatedAt: Date | null
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiBaseUrl}/vehicles`
  constructor(private http: HttpClient) {}

  getVehicles(page: number = 1): Observable<Vehicle[]> {
    const params = new HttpParams().set('page', page.toString())
    return this.http.get<Vehicle[]>(this.apiUrl, {
      params,
    })
  }
}
