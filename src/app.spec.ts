import { Round, Step, Result, Game } from './app';

describe('Round', () => {
  test('first round created with one color', () => {
    expect(new Round([]).generatedColors).toHaveLength(1);
  });

  test('next round can be created from the previous one', () => {
    const first = new Round([]);
    const second = Round.fromPrevious(first);

    expect(second.generatedColors).toHaveLength(2);
    expect(second.generatedColors[0]).toBe(first.generatedColors[0]);
  });

  test('Is this winning step', () => {
    const round = new Round(['green']);

    expect(round.makeStep(new Step('green'), 2, true)).toEqual({result: 'win'});
  })

  test('Is this losing step', () => {
    const round = new Round(['green']);

    expect(round.makeStep(new Step('yellow'), 2)).toEqual({result: 'loose'});
  })

  test('Is this step correct', () => {
    const round = new Round(['green']);

    expect(round.makeStep(new Step('green'), 2)).toEqual({result: 'next'});
  })
})

describe('Step', () => {
  test('Step knows its value', () => {
    const step = new Step('green');

    expect(step.value()).toEqual({color: 'green'});
  })
})

describe('Result', () => {
  test('Result knows its value', () => {
    const result = new Result('correct');

    expect(result.value()).toEqual({result: 'correct'});
  })
})

describe('Game', () => {
  test('Is game on', () => {
    const game = new Game(10);

    expect(game.switchPower()).toBeTruthy();
  })

  test('We lost game with one round', () => {
    const game = new Game(1);
    const firstRound = new Round([]);
    firstRound.generatedColors[0] = 'green';

    expect(game.makeStepHandler(firstRound, 'blue', 1)).toEqual('Game over =(');
  })

  test('We win game with one round', () => {
    const game = new Game(1);
    const firstRound = new Round([]);
    firstRound.generatedColors[0] = 'blue';

    expect(game.makeStepHandler(firstRound, 'blue', 1)).toEqual('You win =)');
  })

  test('We need next step with two rounds', () => {
    const game = new Game(2);
    const firstRound = new Round([]);
    firstRound.generatedColors[0] = 'blue';

    expect(game.makeStepHandler(firstRound, 'blue', 1)).toEqual({result: 'next'});
  })

  test('We loose game with one round', () => {
    const game = new Game(2);
    const firstRound = new Round([]);
    const round = Round.fromPrevious(firstRound);

    firstRound.generatedColors[0] = 'blue';
    round.generatedColors[1] = 'green';

    game.makeStepHandler(firstRound, 'blue', 1);
    game.makeStepHandler(round, 'blue', 1)

    expect(game.makeStepHandler(round, 'yellow', 2)).toEqual('Game over =(');
  })

  test('We win game with one round', () => {
    const game = new Game(2);
    const firstRound = new Round([]);
    const round = Round.fromPrevious(firstRound);

    firstRound.generatedColors[0] = 'blue';
    round.generatedColors[1] = 'green';

    game.makeStepHandler(firstRound, 'blue', 1);
    game.makeStepHandler(round, 'blue', 1)

    expect(game.makeStepHandler(round, 'green', 2)).toEqual('You win =)');
  })

  test('We need next step with two rounds', () => {
    const game = new Game(3);
    const firstRound = new Round([]);
    const round = Round.fromPrevious(firstRound);

    firstRound.generatedColors[0] = 'blue';
    round.generatedColors[1] = 'green';

    game.makeStepHandler(firstRound, 'blue', 1);
    game.makeStepHandler(round, 'blue', 1)

    expect(game.makeStepHandler(round, 'green', 2)).toEqual({result: 'next'});
  })
})



