import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family, Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) {
  }

  create(name: string, family: string): Observable<Position[]> {
    return this.http.post<Position[]>('/api/position', {name, family})
  }


  fetch(family: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${family}`)
  }

}
