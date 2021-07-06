import {UpcaseValueConverter} from '../../../src/value-converters/upcase';

describe('upcase value converter', () => {
  let upcase = new UpcaseValueConverter();

  it('ignores non string input', () => {
    expect(upcase.toView(2)).toBe('');
    expect(upcase.toView(null)).toBe('');
    expect(upcase.toView(undefined)).toBe('');
    expect(upcase.toView({})).toBe('');
    expect(upcase.toView(true)).toBe('');
  });

  it('convert string to upper case', () => {
    expect(upcase.toView('aBc')).toBe('ABC');
    expect(upcase.toView(' x y z ')).toBe(' X Y Z ');
  });
});
