import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family, Message, Position} from "../interfaces";
import {FamilyService} from "./family.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient,
              private family: FamilyService) {
  }

  create(name: string, family: string): Observable<Position[]> {
    return this.http.post<Position[]>('/api/position', {name, family})
  }


  fetch(): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${this.family.localGet()}`)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${id}`)
  }

  update(id: string, name: string): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${id}`, {name, family: this.family.localGetName()})
  }

}
