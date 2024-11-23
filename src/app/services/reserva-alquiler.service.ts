import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {ReservaAlquiler} from "../model/reserva-alquiler";

@Injectable({
  providedIn: 'root'
})
export class ReservaAlquilerService {
  private url: string =environment.apiUrl + '/NextHouse';
  private http: HttpClient = inject(HttpClient);
  private listaCambio:Subject<ReservaAlquiler[]>= new Subject<ReservaAlquiler[]>();

  constructor() { }
  // Método para listar todos los mensajes
  list(): Observable<any> {
    return this.http.get<ReservaAlquiler[]>(this.url + "/Listar_ReservaAlquiler");
  }

  // Método para obtener un mensaje por ID
  listId(id: number): Observable<any> {
    console.log(this.url + "/ReservaAlquilerFind/" + id);
    return this.http.get<ReservaAlquiler[]>(this.url + "/ReservaAlquilerFind/" + id);
  }

  // Método para insertar un nuevo mensaje
  insert(reservaAlquiler: ReservaAlquiler): Observable<any> {
    return this.http.post(this.url + "/ReservaAlquiler", reservaAlquiler);
  }

  // Método para modificar un mensaje existente
  update(reservaAlquiler: ReservaAlquiler): Observable<any> {
    return this.http.put(this.url + "/Modificar_ReservaAlquiler", reservaAlquiler);
  }

  // Método para eliminar un mensaje por ID
  delete(id: number): Observable<Object> {
    return this.http.delete(this.url + "/Eliminar_ReservaAlquiler/" + id);
  }
  // Método para actualizar la lista de mensajes (Subject para cambio reactivo)
  setList(listaNueva: ReservaAlquiler[]) {
    this.listaCambio.next(listaNueva);
  }

  // Metodo para obtener los cambios en la lista
  getListaCambio(): Observable<ReservaAlquiler[]> {
    return this.listaCambio.asObservable();
  }
}
