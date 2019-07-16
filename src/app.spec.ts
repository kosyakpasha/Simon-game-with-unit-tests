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
  test('Take one correct step', () => {
    const game = new Game();

    expect(game.takeStep(new Step('green'))).toEqual({result: 'win'});
  });

  test('Take one correct step', () => {
    const game = new Game();

    expect(game.takeStep(new Step('green'))).toEqual({result: 'win'});
  });

  // test('One round, one correct step - it is a "win"', () => {
  //   const game = new Game();

  //   expect(game.clickResult).toEqual({result: 'win'});
  // });

  // test('Two rounds, two correct steps - it is a "next"', () => {
  //   const game = new Game();

  //   game.click('green');
  //   // expect(game.clickHandler(new Step('green'))).toEqual({result: 'next'});
  // });

  // test('test test', () => {
  //   expect(new Round([]).colors).toHaveLength(1);
  // });
});
