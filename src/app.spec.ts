import { Round, Step, Result, Game } from './app';

describe('Round', () => {
  test('first round created with one color', () => {
    expect(new Round([]).colors).toHaveLength(1);
  });

  test('next round can be created from the previous one', () => {
    const first = new Round([]);
    const second = Round.fromPrevious(first);

    expect(second.colors).toHaveLength(2);
    expect(second.colors[0]).toBe(first.colors[0]);
  });

  test('Is this winning step', () => {
    const round = new Round(['green', 'blue']);

    round.makeStep(new Step('green'));
    round.makeStep(new Step('blue'));
    expect(round.makeStep(new Step('green'))).toEqual({result: 'win'});
  });

  test('Is this losing step', () => {
    const round = new Round([]);

    expect(round.makeStep(new Step('yellow'))).toEqual({result: 'loose'});
  });

  test('Is this step correct', () => {
    const round = new Round(['green']);

    expect(round.makeStep(new Step('green'))).toEqual({result: 'next'});
  })
});

describe('Step', () => {
  test('Step knows its value', () => {
    const step = new Step('green');

    expect(step.value()).toEqual('green');
  })
});

describe('Result', () => {
  test('Result knows its value', () => {
    const result = new Result('correct');

    expect(result.value()).toEqual('correct');
  })
});

describe('Game', () => {
  test('Give one correct step', () => {
    const game = new Game();

    expect(game.giveStep(new Step('green'))).toEqual('win');
  });

  test('Give two correct steps', () => {
    const game = new Game();

    game.giveStep(new Step('green'));
    expect(game.giveStep(new Step('green'))).toEqual('next');
  });

  test('Take one correct step', () => {
    const game = new Game();

    game.giveStep(new Step('green'));
    expect(game.takeColor()).toEqual('green');
  });

  test('Take first incorrect step', () => {
    const game = new Game();

    game.giveStep(new Step('blue'));
    expect(game.takeColor()).toEqual(null);
  });

  test('Take second correct step', () => {
    const game = new Game();

    game.giveStep(new Step('green'));
    game.giveStep(new Step('green'));
    expect(game.takeColor()).toEqual('green');
  });
});
