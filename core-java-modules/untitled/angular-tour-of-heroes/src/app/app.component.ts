// @ts-ignore
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  template: `
    <div id="statusArea" className="status">Next player: <span>{{current}}</span></div>
    <div *ngIf="hasWinner" id="winnerArea" className="winner">Winner: <span>{{current}}</span></div>
    <button (click)="reset()">Reset</button>
    <section>
      <div class="row" *ngFor="let row of multi; let i = index">
        <button [disabled]="isTaken(i,j)" (click)="play(i,j)" *ngFor="let col of row; let j = index" class="square" style="width:40px;height:40px;">{{col}}</button>
      </div>
    </section>
  `,
  styles: []
})

export class MainAppComponent implements OnInit {
  public hasWinner = false;

  public current = 'X';
  public multi: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  public transpose: string[][] = [['', '', ''], ['', '', ''], ['', '', '']];
  ngOnInit() {

  }
  public reset() {
    this.multi = [['', '', ''], ['', '', ''], ['', '', '']];
    this.transpose = [['', '', ''], ['', '', ''], ['', '', '']];
    this.current = 'X';
    this.hasWinner = false;
  }

  public isTaken(i: number, j: number) {
    return this.multi[i][j];
  }

  public play(i: number, j: number) {
    this.multi[i][j] = this.current;
    this.transpose[j][i] = this.current;
    this.toggleCurrent();

  }
  private toggleCurrent() {
    let next: string;

    if (this.hasWon()) {
      this.hasWinner = true;
    }
    else {
      if (this.current === 'X') next = 'O';
      if (this.current === 'O') next = 'X';
      this.current = next;
    }

  }

  private hasWon(): boolean {

    let test = [this.current, this.current, this.current].join("");
    for (let i = 0; i < 3; i++) {
      if (this.multi[i].join("") === test) return true;
    }

    for (let i = 0; i < 3; i++) {
      if (this.transpose[i].join("") === test) return true;
    }
    let diago1 = [];
    let diago2 = [];

    diago1 = [this.multi[0][0], this.multi[1][1], this.multi[2][2]];
    diago2 = [this.multi[0][2], this.multi[1][1], this.multi[2][0]];


    console.log(diago1);
    if (diago1.join("") === test) return true;
    if (diago2.join("") === test) return true;


    return false;

  }

}
