import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Point} from "../entities/point";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PointHitService {
  private URL = "http://localhost:8080/points";

  constructor(private http: HttpClient) { }

  public addPoint(point : Point, headers: HttpHeaders): Observable<Point>{
    return this.http.post<Point>(this.URL, point, {headers: headers})
  }

  public getAllPoints(headers: HttpHeaders): Observable<Point[]>{
    return this.http.get<Point[]>(this.URL, {headers : headers});
  }

}
