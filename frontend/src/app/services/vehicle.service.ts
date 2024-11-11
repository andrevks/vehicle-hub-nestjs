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

export interface VehiclePagination {
  vehicles: Vehicle[]
  pagination: {
    totalItems: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiBaseUrl}/vehicles`
  constructor(private http: HttpClient) {}

  getVehicles(
    page: number = 1,
    limit: number = 10,
  ): Observable<VehiclePagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
    return this.http.get<VehiclePagination>(this.apiUrl, {
      params,
    })
  }
}
