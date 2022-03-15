import {Component, OnInit} from '@angular/core';
import {Point} from "../../entities/point";
import {PointHitService} from "../../services/point-hit.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {HttpHeaders} from "@angular/common/http";
import {Subject} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public points: Subject<Point[]> = new Subject<Point[]>();
  public _points: Point[] = [];
  private token: string | null;
  private _point: Point = new Point();
  public radius : Subject<number> = new Subject<number>();

  selectedValueX = 0;
  selectedValueY = 0
  selectedValueR = 2;
  pointForm: FormGroup;

  constructor(private pointHitService: PointHitService,
              private authService: AuthService,
              private hitService: PointHitService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.token = null;

    this.pointForm = formBuilder.group({
      x: ['0', [Validators.required]],
      y: ['0', [Validators.min(-2.99999), Validators.max(2.99999)]],
      r: ['1', [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {
    this.token = this.authService.getToken();
    if (!this.token) {
      this.router.navigate(['/login'])
    } else {
      this.hitService.getAllPoints(new HttpHeaders().set("Authorization", this.token)).subscribe((data) => {
        this._points = (data)
        this.points.next(data)
      }, (error => {
        alert(error.status + " -- " + error.error)
      }))
    }
    // @ts-ignore
    /*setInterval(()=>{
      this.checkNewPoint()
    },10000)*/
  }

  public changeR(){
    if (this.validateR(this.selectedValueR)){
      this.radius.next(this.selectedValueR)}
  }

  public checkNewPoint() {
    if (!this.token) this.router.navigate(['/login'])
    else {
      this.hitService.addPoint(this._point, new HttpHeaders().set("Authorization", this.token)).subscribe((data) => {
        this._points.push(data)
        this.points.next(this._points)
      }, error => {
        //alert(error.status + " -- " + error.error)
        if (error.status == 0) this.router.navigate(['/login'])
      })
    }

  }
  public pointFromCanvas(p: Point){
    this._point = p;
    this.checkNewPoint()
  }

  public isNaN(value : any){
    return isNaN(value);
  }

  public sendNewPoint(){
    this._point = new Point()
    this._point.r = this.selectedValueR
    this._point.x = this.selectedValueX
    this._point.y = this.selectedValueY
    this.checkNewPoint()
  }

  public validateX(x : number){
    let arrX = [0, 1, 2, 3, 4, 5, -3, -2, -1]
    let ans = false;
    arrX.forEach((e)=>{
      if (e == x){
        ans =  true;
      }
    })
    return ans;
  }

  public validateY(y : number){
    if (y > -3 && y < 3) return true;
    return false;

  }
  public validateR(r : number){
    let arrR = [1, 2, 3, 4, 5]
    let ans = false;
    arrR.forEach((e)=>{
      if (e == r){
        ans =  true;
      }
    })
    return ans;
  }

}
