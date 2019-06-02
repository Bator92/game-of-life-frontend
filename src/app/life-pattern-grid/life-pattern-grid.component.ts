import {Component, Input, OnInit} from '@angular/core';
import {LifePattern} from '../types/life-pattern';
import {Position} from '../types/position';
import {RuleSpecification} from '../types/rule-specification';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-life-pattern-grid',
  templateUrl: './life-pattern-grid.component.html',
  styleUrls: ['./life-pattern-grid.component.css']
})
export class LifePatternGridComponent implements OnInit {

  rows = 100;
  columns = 100;

  autoPlayInterval = 1000;

  autoPlayRunning = false;
  generationStepperInstance: Subscription;
  generationCounter = 0;

  aliveCells: boolean[][];
  ruleSpecification: RuleSpecification;

  constructor() {
  }

  ngOnInit() {
  }

  @Input()
  set lifePattern(val: LifePattern) {
    if (val) {
      this.generationCounter = 0;
      this.aliveCells = this.initCells();
      this.ruleSpecification = val.ruleSpecification;
      this.convertToGridUniverseAndSetAliveCells(val);
    }
  }

  onNextGeneration(): void {
    for (let i = 0; i < this.aliveCells.length; i++) {
      for (let j = 0; j < this.aliveCells[i].length; j++) {
        if (this.isAliveCell(i, j) && !this.canSurvive(i, j)) {
          this.killCell(i, j);
        }
        if (!this.isAliveCell(i, j) && this.canBirth(i, j)) {
          this.createCell(i, j);
        }
      }
    }
    this.generationCounter++;
  }

  onAutoPlayStart() {
    this.autoPlayRunning = true;
    this.generationStepperInstance = interval(this.autoPlayInterval)
      .subscribe(() => this.onNextGeneration());
  }

  onAutoPlayStop() {
    this.autoPlayRunning = false;
    this.generationStepperInstance.unsubscribe();
  }

  private createCell(i: number, j: number) {
    this.aliveCells[i][j] = true;
  }

  private killCell(i: number, j: number) {
    this.aliveCells[i][j] = false;
  }

  private canBirth(i: number, j: number) {
    return this.ruleSpecification.birthRule.includes(this.countAliveNeighbours(i, j));
  }

  private canSurvive(i: number, j: number): boolean {
    return this.ruleSpecification.survivalRule.includes(this.countAliveNeighbours(i, j));
  }

  private convertToGridUniverseAndSetAliveCells(lifePattern: LifePattern) {
    lifePattern.blocks.forEach(block => {
      const position = this.convertCoordinateToGridUniverse(block.position);
      for (let i = 0; i < block.aliveCells.length; i++) {
        for (let j = 0; j < block.aliveCells[i].length; j++) {
          const row = position.x + i;
          const column = position.y + j;
          if (this.isCellInGrid(row, column)) {
            this.aliveCells[row][column] = block.aliveCells[i][j];
          }
        }
      }
    });
  }

  private initCells(): boolean[][] {
    const array = [];
    for (let i = 0; i < this.rows; i++) {
      array.push([false]);
      for (let j = 0; j < this.columns; j++) {
        array[i][j] = false;
      }
    }
    return array;
  }

  private convertCoordinateToGridUniverse(coordinate: Position): Position {
    return {x: -(coordinate.y) + this.rows / 2, y: coordinate.x + this.columns / 2};
  }

  private isAliveCell(row: number, column: number): boolean {
    if (!this.isCellInGrid(row, column)) {
      return false;
    } else {
      return this.aliveCells[row][column];
    }
  }

  private isCellInGrid(row: number, column: number) {
    return row < this.rows - 1 && row > 0 && column < this.columns && column > 0;
  }

  private countAliveNeighbours(row: number, column: number): number {
    let aliveCount = 0;
    if (this.isAliveCell(row - 1, column - 1)) {
      aliveCount++;
    }
    if (this.isAliveCell(row - 1, column)) {
      aliveCount++;
    }
    if (this.isAliveCell(row - 1, column + 1)) {
      aliveCount++;
    }
    if (this.isAliveCell(row, column - 1)) {
      aliveCount++;
    }
    if (this.isAliveCell(row, column + 1)) {
      aliveCount++;
    }
    if (this.isAliveCell(row + 1, column - 1)) {
      aliveCount++;
    }
    if (this.isAliveCell(row + 1, column)) {
      aliveCount++;
    }
    if (this.isAliveCell(row + 1, column + 1)) {
      aliveCount++;
    }
    return aliveCount;
  }
}
