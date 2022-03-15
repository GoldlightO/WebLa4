import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Point} from "../entities/point";

@Injectable({
  providedIn: 'root'
})
export class PointUpdateService {
  public points = new Subject<Point[]>();
  constructor() { }

  public changePoints(points : Point[]){
    this.points.next(points);
  }
}
