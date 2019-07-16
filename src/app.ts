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

        if (this.numStep  >= this.colors.length) {
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
    public clickResult: Result;

    constructor() {
        this.numOfRound = 0;
        this.amountOfRound = 10;
    }

    public takeStep(step: Step) {
        if (!this.round) {
            this.numOfRound++;
            this.round = new Round([]);
        } else if (this.round.numStep === this.amountOfRound) {
            this.numOfRound++;
            this.round = Round.fromPrevious(this.round);
        }

        return this.round.makeStep(step);
    }

    // private init() {
    //     const firstRound = new Round([]);

    //     this.clickHandler(firstRound);
    // }

    // private clickHandler(firstRound: Round) {
    //     this.click(new Step('green'), firstRound);
    // }

    // public click(step, firstRound?: Round) {
    //     if (firstRound && isEquivalent(firstRound.makeStep(step), {result: 'win'}) && this.amountOfRound === 1) {
    //         this.clickResult = new Result('win');
    //     } else if (isEquivalent(firstRound.makeStep(step), {result: 'win'}) && this.amountOfRound > 1) {
    //         this.round = Round.fromPrevious(firstRound);

    //         console.log('2');
    //     } else if (this.amountOfRound > 1 && isEquivalent(this.round.makeStep(step), {result: 'next'})) {
    //         this.round.makeStep(new Step('green'));
    //     } else if (this.amountOfRound > 1 && isEquivalent(this.round.makeStep(step), {result: 'loose'})) {
    //         console.log('loose');
    //     }

    //     return this.clickResult;
    // }
}

function randomize(max, min) {
    return Math.floor(Math.random() * max) + min;
}

function isEquivalent(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        const propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}
