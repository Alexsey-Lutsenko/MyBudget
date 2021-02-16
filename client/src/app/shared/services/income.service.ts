import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Income, Message, Position} from "../interfaces";
import {FamilyService} from "./family.service";

@Injectable({
  providedIn: "root"
})
export class IncomeService {
  constructor(private http: HttpClient,
              private family: FamilyService) {
  }

  create(sum: number): Observable<Income> {
    return this.http.post<Income>('/api/income/',{sum, family: this.family.localGet()})
  }

  fetch(): Observable<Income[]> {
    return this.http.get<Income[]>(`/api/income/${this.family.localGet()}`)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/income/${id}`)
  }

  update(id: string, sum: number): Observable<Income> {
    return this.http.patch<Income>(`/api/income/${id}`, {sum, family: this.family.localGetName()})
  }
}
