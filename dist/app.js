"use strict";
exports.__esModule = true;
var Round = /** @class */ (function () {
    function Round(previousColors) {
        this.defaultColors = ['blue', 'yellow', 'red', 'green'];
        this.generatedColors = [];
        this.generatedColors = previousColors.concat([this.defaultColors[3]]);
    }
    Round.fromPrevious = function (previous) {
        return new Round(previous.generatedColors);
    };
    Round.prototype.makeStep = function (step, numOfStep, isLast) {
        debugger;
        if (this.generatedColors[numOfStep - 1] === step.color && isLast === true) {
            return new Result('win');
        }
        else if (this.generatedColors[numOfStep - 1] === step.color) {
            return new Result('next');
        }
        else if (this.generatedColors[numOfStep - 1] !== step.color) {
            return new Result('loose');
        }
    };
    return Round;
}());
exports.Round = Round;
var Result = /** @class */ (function () {
    function Result(result) {
        this.result = result;
    }
    Result.prototype.value = function () {
        return new Result(this.result);
    };
    return Result;
}());
exports.Result = Result;
var Step = /** @class */ (function () {
    function Step(color) {
        this.color = color;
    }
    Step.prototype.value = function () {
        return new Step(this.color);
    };
    return Step;
}());
exports.Step = Step;
var Game = /** @class */ (function () {
    function Game(amountOfRounds) {
        this.powerOn = false;
        this.init();
    }
    Game.prototype.switchPower = function () {
        return this.powerOn = !this.powerOn;
    };
    Game.prototype.init = function () {
        var round = new Round([]);
        if (round.makeStep(new Step('blue'), 1) === new Result('next')) {
            round.makeStep(new Step('yellow'), 2);
        }
    };
    return Game;
}());
exports.Game = Game;
// const game = new Game(10);
//
// game.switchPower();
//
// class Game {
//     private round: Round;
//     private click: Step[] = [];
//     private roundsNum: number = 1;
//
//     constructor(private amount: number) {
//         this.start();
//     }
//
//     paintBlocks(roundNum): void {
//         const blocks = document.querySelectorAll('.item') as NodeListOf<HTMLElement>;
//         const blocksArr: HTMLElement[] = Array.from(blocks);
//
//         this.round.generatedColors.map((color, i) => {
//             blocksArr.map((block, t) => {
//                 if (t > roundNum) {
//                     return;
//                 }
//
//                 if (block.classList.value.includes(color.color)) {
//                     setTimeout(() => {
//                         block.classList.add('active');
//
//                         setTimeout(() => {
//                             block.classList.remove('active');
//                         }, 500)
//                     }, 500 * t)
//                 }
//             });
//         });
//     }
//
//     start() {
//         this.round = new Round(this.roundsNum);
//         this.nextRound(1);
//         this.clickHandler();
//     }
//
//     private clickHandler(): void {
//         const container = document.querySelector('.container');
//         let roundIsCorrect: boolean = false;
//         let roundNum = 1;
//
//         container.addEventListener('click', (event: Event) => {
//             const target = event.target as HTMLElement;
//
//             if ((<HTMLElement>target).className.includes('blue')) {
//                 target.classList.add('active');
//                 this.click.push(new Step('blue'));
//             }
//
//             if ((<HTMLElement>target).className.includes('red')) {
//                 target.classList.add('active');
//                 this.click.push(new Step('red'));
//             }
//
//             if ((<HTMLElement>target).className.includes('green')) {
//                 target.classList.add('active');
//                 this.click.push(new Step('green'));
//             }
//
//             if ((<HTMLElement>target).className.includes('yellow')) {
//                 target.classList.add('active');
//                 this.click.push(new Step('yellow'));
//             }
//
//             setTimeout(() => {
//                 const active = document.querySelector('.active');
//
//                 active.classList.remove('active');
//             }, 500);
//
//             if (!this.round.evaluate([...this.click])) {
//                 alert('Game over =(');
//
//                 roundIsCorrect = false;
//                 return;
//             }
//
//             roundIsCorrect = true;
//
//             if (roundIsCorrect === true && roundNum <= this.amount) {
//                 roundNum++;
//                 this.nextRound(roundNum);
//             }
//         });
//     }
//
//     nextRound(numOfRound) {
//         this.click = [];
//         this.round = new Round(numOfRound);
//         this.roundsNum = numOfRound;
//         for (let i = 1; i <= this.roundsNum; i++) {
//             this.round.generateColors();
//             this.paintBlocks(this.roundsNum);
//         }
//     }
// }
//
// const simon = new Game(10);
