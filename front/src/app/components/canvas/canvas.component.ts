import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SVG, extend as SVGextend, Element as SVGElement} from '@svgdotjs/svg.js'
import {Subject} from "rxjs";
import {Point} from "../../entities/point";


@Component({
  selector: 'app-canvas',
  template: '<div [style.width.px]="RECT_SI" [style.height.px]="RECT_SI" id="canvas" [style.margin] = 0 ></div>',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {

  @Output() sendSignal = new EventEmitter<Point>()

  public send(p: Point){
    this.sendSignal.emit(p)
  }

  constructor() {

  }

  @Input('value') $value!: Subject<Point[]>;
  value: Point[] = []
  @Input("selectedRadius") $radius!: Subject<number>
  selRad : number = 2;

  point: any = null;
  RECT_SI : number = 600;
  _point: Point = new Point();
  ngOnInit(): void {
    this.$value.subscribe(newValues => {
      this.value = newValues;
      console.log(this.value);
      this.value.forEach((e)=>drawCoord(e))
    })
    this.$radius.subscribe((newValue) => {
      this.selRad = newValue;
      radius = this.selRad
      draw.clear()
      drawAllElements();
      this.value.forEach((e)=>drawCoord(e))
    })
    draw = SVG().addTo('#canvas').size(RECT_SIZE, RECT_SIZE)
    // @ts-ignore
    var {addEventListener} = document.querySelector("SVG")
    // @ts-ignore
    sizes = document.querySelector("SVG").getBoundingClientRect()
    addEventListener('mousedown', (e: MouseEvent) => {
      var x_cord = e.clientX - sizes.left
      var y_cord = e.clientY - sizes.top
      if (!(x_cord > RECT_SIZE || y_cord > RECT_SIZE)){
        this._point = new Point();
        this._point.x = xFromCanvasToNoraml(x_cord)
        this._point.y = yFromCanvasToNoraml(y_cord)
        this._point.r = radius;
        this.send(this._point)
      }

    })
    /*addEventListener('mouseover', (e: MouseEvent) => {
      var x_cord = e.clientX - sizes.left
      var y_cord = e.clientY - sizes.top
    })
    addEventListener('mouseout', (e: MouseEvent) => {
      var x_cord = e.clientX - sizes.left
      var y_cord = e.clientY - sizes.top
    })*/
    drawAllElements();
  }

}

var draw: any;
draw = null;

var sizes: any;
sizes = null;

const RECT_SIZE = 600,
  OFFSET = RECT_SIZE / 20,
  HALF_RECT_SIZE = RECT_SIZE / 2,
  ARROW_X = RECT_SIZE / 70, ARROW_Y = RECT_SIZE / 130,
  RECT_MOVE_X = 0, RECT_MOVE_Y = 0,
  AXIS_FULL_LENGTH = RECT_SIZE - 2 * OFFSET, //Длинна Оси без отступов
  HALF_RADIUS_LENGTH_PX = AXIS_FULL_LENGTH / 4,
  RADIUS_LENGTH_PX = 2 * HALF_RADIUS_LENGTH_PX,
  SMALL_LINE_LENGTH = RECT_SIZE / 50,
  OFFSET_X = 5, OFFSET_Y = 20

const LINES_COLOR = "red",
  TEXT_COLOR = "blue"


var radiusLinesGroup;

var textHeight = 0;
var radius = 2 //todo

function drawMainRect() {
  var mainSquare = draw.rect(RECT_SIZE, RECT_SIZE)
  mainSquare.move(RECT_MOVE_X, RECT_MOVE_Y)
  mainSquare.fill("white")
  mainSquare.stroke({width: 3, color: 'lime'})
}

function drawTriangle() {
  /*draw.line(HALF_RECT_SIZE, HALF_RECT_SIZE, HALF_RECT_SIZE, HALF_RECT_SIZE + HALF_RADIUS_LENGTH_PX)
    .stroke({
      width: 2,
      color: LINES_COLOR
    })
  draw.line(HALF_RECT_SIZE, HALF_RECT_SIZE - HALF_RADIUS_LENGTH_PX, HALF_RECT_SIZE - HALF_RADIUS_LENGTH_PX, HALF_RECT_SIZE).stroke({
    width: 2,
    color: LINES_COLOR
  })
  draw.line(HALF_RECT_SIZE, HALF_RECT_SIZE, HALF_RECT_SIZE + HALF_RADIUS_LENGTH_PX, HALF_RECT_SIZE).stroke({
    width: 2,
    color: LINES_COLOR
  })*/
  let x1 = HALF_RECT_SIZE - HALF_RADIUS_LENGTH_PX
  draw.polygon(HALF_RECT_SIZE + "," + HALF_RECT_SIZE + " " + x1 + "," + HALF_RECT_SIZE + " " + HALF_RECT_SIZE + "," + x1).stroke({
    width: 2,
    color: LINES_COLOR
  }).fill("aqua")
}

function drawRect() {
  let temp_rect = draw.rect(HALF_RADIUS_LENGTH_PX, RADIUS_LENGTH_PX)
  temp_rect.move(HALF_RECT_SIZE, HALF_RECT_SIZE - RADIUS_LENGTH_PX)
  temp_rect.fill("aqua").stroke({
    width: 2,
    color: LINES_COLOR
  })
}


function drawHalfCircle() {
  let x1 = HALF_RECT_SIZE + HALF_RADIUS_LENGTH_PX
  draw.polygon(HALF_RECT_SIZE + "," + HALF_RECT_SIZE + " " + x1 + "," + HALF_RECT_SIZE + " " + HALF_RECT_SIZE + "," + x1).fill("aqua")

  let y1 = HALF_RECT_SIZE + HALF_RADIUS_LENGTH_PX
  let center = HALF_RECT_SIZE + HALF_RADIUS_LENGTH_PX / 2 + RECT_SIZE / 9
  let center2 = HALF_RADIUS_LENGTH_PX + HALF_RECT_SIZE;
  draw.path("M" + HALF_RECT_SIZE + "," + y1 + " Q" +
    center + "," + center + " " +
    center2 + "," + HALF_RECT_SIZE
  ).fill("aqua")
    .stroke({
      width: 2,
      color: LINES_COLOR
    })
}

function drawAxisX(length: number, x: number) {
  let tempAxisX = draw.line(x, HALF_RECT_SIZE - length / 2, x, HALF_RECT_SIZE + length / 2).stroke({
    width: 2,
    color: LINES_COLOR
  })
  return tempAxisX;
}

function drawAxisY(length: number, y: number) {
  let tempAxisY = draw.line(HALF_RECT_SIZE - length / 2, y, HALF_RECT_SIZE + length / 2, y).stroke({
    width: 2,
    color: LINES_COLOR
  })
  return tempAxisY;
}

function drawArrowX(x: number, y: number) {
  draw.line(RECT_SIZE - OFFSET / 2, HALF_RECT_SIZE, RECT_SIZE - OFFSET / 2 - x, HALF_RECT_SIZE - y).stroke({
    width: 2,
    color: LINES_COLOR
  })
  draw.line(RECT_SIZE - OFFSET / 2, HALF_RECT_SIZE, RECT_SIZE - OFFSET / 2 - x, HALF_RECT_SIZE + y).stroke({
    width: 2,
    color: LINES_COLOR
  })
}

function drawArrowY(y: number, x: number) {
  draw.line(HALF_RECT_SIZE, OFFSET / 2, HALF_RECT_SIZE - x, OFFSET / 2 + y).stroke({width: 2, color: LINES_COLOR})
  draw.line(HALF_RECT_SIZE, OFFSET / 2, HALF_RECT_SIZE + x, OFFSET / 2 + y).stroke({width: 2, color: LINES_COLOR})
}

function drawTextX(x: number, word: string) {
  let tempTextX = draw.text(word).id(x + "-text_coord")
  // @ts-ignore
  tempTextX.move(x - document.getElementById(x + "-text_coord").getBBox().width / 2, HALF_RECT_SIZE - OFFSET_Y - OFFSET_Y / 6)
  return tempTextX
}

function drawTextY(y: number, word: string) {
  let tempTextY = draw.text(word).move(HALF_RECT_SIZE + 2 * OFFSET_X, y - textHeight / 2)
  return tempTextY
}

function drawZero() {
  draw.text("0").move(HALF_RECT_SIZE + OFFSET_X, HALF_RECT_SIZE - OFFSET_Y).fill(TEXT_COLOR).id("zero")
  // @ts-ignore
  textHeight = document.querySelector("#zero").getBBox().height;
}

function drawLinesText() {
  radiusLinesGroup = draw.group()
  for (let i = -2; i < 3; i++) {
    if (i == 0) continue;
    radiusLinesGroup
      .add(drawTextX(HALF_RECT_SIZE + i * HALF_RADIUS_LENGTH_PX, "" + i * radius / 2).fill(TEXT_COLOR))
      .add(drawTextY(HALF_RECT_SIZE + i * HALF_RADIUS_LENGTH_PX, "" + -i * radius / 2).fill(TEXT_COLOR))

  }
}

function drawCoordinateLines() {
  for (let i = -2; i < 3; i++) {
    if (i == 0) continue;
    drawAxisX(SMALL_LINE_LENGTH, HALF_RECT_SIZE + i * HALF_RADIUS_LENGTH_PX)
    drawAxisY(SMALL_LINE_LENGTH, HALF_RECT_SIZE + i * HALF_RADIUS_LENGTH_PX)
  }
}
function xFromCanvasToNoraml(coord : number){
  let ans = Math.round(2*radius*(coord - RECT_SIZE/2)/(AXIS_FULL_LENGTH))
  return ans;
}

function yFromCanvasToNoraml(coord: number){
  let ans = (-2)*radius*(coord - RECT_SIZE/2)/(AXIS_FULL_LENGTH)
  return ans
}

function xFromNormalToCanvas(coord: number){
  let ans = (coord*AXIS_FULL_LENGTH)/(2*radius) + RECT_SIZE/2;
  return ans
}

function yFromNormalToCanvas(coord : number){
  let ans = (coord*AXIS_FULL_LENGTH)/(-2*radius) + RECT_SIZE/2;
  return ans
}

function drawCoord(p: Point){
  let color = p.result ? "green" : "red"
  return draw.circle(10).move(xFromNormalToCanvas(p.x)-5, yFromNormalToCanvas(p.y)-5).fill(color)
}

function drawGraphCoordinate() {
  drawAxisX(AXIS_FULL_LENGTH + OFFSET, HALF_RECT_SIZE)
  drawAxisY(AXIS_FULL_LENGTH + OFFSET, HALF_RECT_SIZE)

  drawArrowX(ARROW_X, ARROW_Y)
  drawArrowY(ARROW_X, ARROW_Y)

  drawTextX(RECT_SIZE - OFFSET / 2, "x").fill(LINES_COLOR)
  drawTextY(0, "y").fill(LINES_COLOR)

  drawCoordinateLines()
}

function drawAllElements() {
  drawMainRect()
  drawTriangle()
  drawRect()
  drawHalfCircle()
  drawGraphCoordinate()
  drawZero()
  drawLinesText()
  }
