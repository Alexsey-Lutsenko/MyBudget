import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Family, NewFamily} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  constructor(private http: HttpClient) {
  }

  create(family: NewFamily): Observable<Family> {
    return this.http.post<Family>('/api/family', family)
  }

  fetch(): Observable<Family[]> {
    return this.http.get<Family[]>('/api/family/')
  }
}
