import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, Outlay} from "../interfaces";
import {FamilyService} from "./family.service";

@Injectable({
  providedIn: "root"
})
export class OutlayService {

  constructor(private http: HttpClient,
              private family: FamilyService) {
  }

  create(position: string, sum: number): Observable<Outlay> {
    return this.http.post<Outlay>('/api/outlay',{position, sum, family: this.family.localGet()})
  }

  fetch(id: string): Observable<Outlay[]> {
    return this.http.get<Outlay[]>(`/api/outlay/${id}`)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/outlay/${id}`)
  }

}
