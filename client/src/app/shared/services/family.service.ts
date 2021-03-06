import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family, Message} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(private http: HttpClient) {
  }

  create(family: string, def: number): Observable<Family> {
    return this.http.post<Family>('/api/family', {name: family, def})
  }

  fetch(): Observable<Family[]> {
    return this.http.get<Family[]>('/api/family/')
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/family/${id}`)
  }

  deleteUser(id: string, userId: string): Observable<Message> {
    return this.http.patch<Message>(`/api/family/del/${id}`, {id, userId: userId})
  }

  addUser(id:string, email: string): Observable<Family> {
    return this.http.patch<Family>(`/api/family/add/${id}`, {id, email})
  }

  rename(id: string, name: string): Observable<Family> {
    return this.http.patch<Family>(`/api/family/rename/${id}`, {id, name})
  }

  def(id: string, def: number): Observable<Family> {
    return this.http.patch<Family>(`/api/family/def/${id}`, {id, def})
  }

  activeIn(family: string) {
    localStorage.setItem('family', family)
  }

  localGet() {
    const raw = localStorage.getItem('family')
    const family = JSON.parse(raw)
    return family.id
  }

  localGetName() {
    const raw = localStorage.getItem('family')
    const family = JSON.parse(raw)
    return family.name
  }

  activeOut() {
    this.activeIn(JSON.stringify({name: 'все списки', id: 	'000000000000000000000000'}))
  }
}
