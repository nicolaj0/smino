import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Issue} from "../model/issue";

@Injectable()
export class SminoIssuesService {

  constructor(private http: HttpClient) {
  }

  getIssues(page: number, sort: string): Observable<Issue[]> {
    return this.http.get<Issue[]>(
      `https://smino.api/issues gibt?page=${page}&sort=${sort}`);
  }
}
