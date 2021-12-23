const { classNames } = require('../calssNames');

describe('classNames function tests', () => {
  describe('common scenario', () => {
    test('classNames("foo", "bar") return string "foo bar"', () => {
      const result = 'foo bar';
      expect(classNames('foo', 'bar')).toEqual(result);
      expect(classNames('foo', { bar: true })).toEqual(result);
      expect(classNames({ foo: true }, { bar: true })).toEqual(result);
      expect(classNames({ foo: true, bar: true })).toEqual(result);
    });

    test('classNames({ "foo-bar": false }) return empty', () => {
      const result = '';
      expect(classNames({ 'foo-bar': false })).toEqual(result);
    });

    test('classNames({ "foo-bar": true }) return string "foo-bar"', () => {
      const result = 'foo-bar';
      expect(classNames({ 'foo-bar': true })).toEqual(result);
    });

    test('classNames("foo",{ bar: true, duck: false },"baz",{ quux: true }) return string "foo bar baz quux"', () => {
      const result = 'foo bar baz quux';
      expect(
        classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }),
      ).toEqual(result);
    });

    test('classNames(null, false, "bar", undefined, 0, 1, { baz: null }, "") return string "bar 1" （other falsy values are just ignored）', () => {
      const result = 'bar 1';
      expect(
        classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''),
      ).toEqual(result);
    });
  });

  describe('Arrays will be recursively flattened as per the rules above', () => {
    test('classNames("a", arr) return string "a b c"', () => {
      const arr = ['b', { c: true, d: false }];
      const result = 'a b c';
      expect(classNames('a', arr)).toEqual(result);
    });
  });

  describe('common scenario add a prefixes names', () => {
    test('classNames("foo", "bar") return string "test-foo test-bar"', () => {
      const result = 'test-foo test-bar';
      const cx = classNames.bind({ publicName: 'test-' });

      expect(cx('foo', 'bar')).toEqual(result);
      expect(cx('foo', { bar: true })).toEqual(result);
      expect(cx({ foo: true }, { bar: true })).toEqual(result);
      expect(cx({ foo: true, bar: true })).toEqual(result);
    });
    test('classNames({ "foo-bar": false }) return empty', () => {
      const result = '';
      const cx = classNames.bind({ publicName: 'test-' });
      expect(cx({ 'foo-bar': false })).toEqual(result);
    });
  });
});
