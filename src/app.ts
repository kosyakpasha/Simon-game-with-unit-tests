export class Round {
    private defaultColors: string[] = ['blue', 'yellow', 'red', 'green'];
    public colors: string[] = [];
    public numStep: number = 0;

    constructor(previousColors: string[]) {
        this.colors = [...previousColors, this.defaultColors[randomize(0, 3)]];
    }

    public static fromPrevious(previous: Round): Round {
        return new Round(previous.colors);
    }

    public makeStep(step: Step): Result {
        this.numStep++;

        if (this.colors[this.numStep - 1] !== step.value()) {
            return new Result('loose');
        }

        if (this.numStep >= this.colors.length) {
            return new Result('win');
        }

        return new Result('next');
    }
}

export class Result {
    constructor(private result: string) {}

    public value() {
        return this.result;
    }
}

export class Step {
    constructor(private color: string) {}

    public value() {
        return this.color;
    }
}

export class Game {
    private round: Round;
    private amountOfRound: number;
    private numOfRound: number;
    private currentResult: Result;

    constructor() {
        this.numOfRound = 1;
        this.amountOfRound = 10;

        this.round = new Round([]);
    }

    public giveStep(step: Step) {
        this.currentResult = this.round.makeStep(step);

        if (this.currentResult.value() === 'win') {
            this.numOfRound++;
            this.round = Round.fromPrevious(this.round);
        }

        return this.currentResult.value();
    }

    public takeColor() {
        if (this.currentResult.value() === 'loose') {
            return null;
        } else {
            return this.round.colors[this.numOfRound - 1];
        }
    }
}

function randomize(max, min) {
    return Math.floor(Math.random() * max) + min;
}
