export class Round {
    private defaultColors: string[] = ['blue', 'yellow', 'red', 'green'];
    public generatedColors: string[] = [];
    public numStep: number = 0;

    constructor(previousColors: string[]) {
        this.generatedColors = [...previousColors, this.defaultColors[randomize(0, 3)]];
    }

    public static fromPrevious(previous: Round): Round {
        return new Round(previous.generatedColors);
    }

    public makeStep(step: Step): Result {
        this.numStep++;

        if (this.generatedColors[this.numStep - 1] === step.color && this.numStep  >= this.generatedColors.length) {
            return new Result('win');
        } else if (this.generatedColors[this.numStep - 1] === step.color) {
            return new Result('next');
        } else if (this.generatedColors[this.numStep - 1] !== step.color) {
            return new Result('loose');
        }
    }
}

export class Result {
    constructor(public result: string) {}

    public value(): Result {
        return new Result(this.result);
    }
}

export class Step {
    constructor(public color: string) {}

    public value(): Step {
        return new Step(this.color);
    }
}

export class Game {
    private powerOn: boolean = false;
    private round: Round;
    public clickResult: Result;

    constructor(private amountOfRounds: number) {
        this.init();
    }

    public switchPower() {
        return this.powerOn = !this.powerOn;
    }

    private init() {
        const firstRound = new Round([]);

        this.clickHandler(firstRound);
    }

    private clickHandler(firstRound: Round) {
        this.click(new Step('green'), firstRound);
    }

    public click(step, firstRound?: Round) {
        if (firstRound && isEquivalent(firstRound.makeStep(step), {result: 'win'}) && this.amountOfRounds === 1) {
            this.clickResult = new Result('win');
        } else if (isEquivalent(firstRound.makeStep(step), {result: 'win'}) && this.amountOfRounds > 1) {
            this.round = Round.fromPrevious(firstRound);

            console.log('2');
        } else if (this.amountOfRounds > 1 && isEquivalent(this.round.makeStep(step), {result: 'next'})) {
            this.round.makeStep(new Step('green'));
        } else if (this.amountOfRounds > 1 && isEquivalent(this.round.makeStep(step), {result: 'loose'})) {
            console.log('loose');
        }

        return this.clickResult;
    }
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
