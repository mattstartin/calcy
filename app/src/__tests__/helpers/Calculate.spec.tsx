import Calculate from '../../helpers/calculate';

describe('doCalculate', () => {
  describe('No Calculations', () => {
    test.each`
    a    | expected
    ${"1"} | ${"1"}
    ${"4"} | ${"4"}
    ${"9.862"} | ${"10"}
    ${"9.262"} | ${"9"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })
  
  
  describe('Simple Addition', () => {
    test.each`
      a      | expected
      ${"1+2"} | ${"3"}
      ${"4+9"} | ${"13"}
      ${"95+77"} | ${"172"}
      ${"9+9+9"} | ${"27"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });

  })

  describe('Decimal Addition Rounds to nearest integer', () => {
    test.each`
      a      | expected
      ${"1.1+1.3"} | ${"2"}
      ${"1.1+1.6"} | ${"3"}
      ${"3+4.4"} | ${"7"}
      ${"2.3+2.14999999"} | ${"4"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })

  describe('Simple Subtraction', () => {
    test.each`
      a      | expected
      ${"10-2"} | ${"8"}
      ${"41-9"} | ${"32"}
      ${"95-77"} | ${"18"}
      ${"10-1-4"} | ${"5"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });

  })

  describe('Decimal Subtraction Rounds to nearest integer', () => {
    test.each`
      a      | expected
      ${"2.3-1.1"} | ${"1"}
      ${"7.8-4.1"} | ${"4"}
      ${"9-1.1"} | ${"8"}
      ${"4.6-2.14999999"} | ${"2"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })
  describe('Simple Multiplication', () => {
    test.each`
      a      | expected
      ${"10*2"} | ${"20"}
      ${"41*9"} | ${"369"}
      ${"95*77"} | ${"7315"}
      ${"10*2*4"} | ${"80"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });

  })

  describe('Decimal Multiplication Rounds to nearest integer', () => {
    test.each`
      a      | expected
      ${"2.3*1.1"} | ${"3"}
      ${"7.8*4.1"} | ${"32"}
      ${"9*1.1"} | ${"10"}
      ${"4.6*2.14999999"} | ${"10"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })

  describe('Supports negative numbers', () => {
    test.each`
      a      | expected
      ${"-4"} | ${"-4"}
      ${"-10+8"} | ${"-2"}
      ${"1-6"} | ${"-5"}
      ${"50*-2"} | ${"-100"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })

  describe('Combined calculations uses BODMAS', () => {
    test.each`
      a      | expected
      ${"10+2-6"} | ${"6"}
      ${"10*2-6"} | ${"14"}
      ${"10+2*6"} | ${"22"}
      ${"10-2*6"} | ${"-2"}
      ${"2*10-2*6"} | ${"8"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })

  describe('Brackers are supported', () => {
    test.each`
      a      | expected
      ${"(10+2)-6"} | ${"6"}
      ${"10*(2-6)"} | ${"-40"}
      ${"(10+2)*6"} | ${"72"}
      ${"(10-2)*6"} | ${"48"}
      ${"2*(10-2)*6"} | ${"96"}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.doCalculate(a)).toBe(expected);
    });
  })
})

describe('isValid', () => {
  describe('Only numbers and valid calculations are permitted', () => {
    test.each`
    a    | expected
    ${"1"} | ${true}
    ${"1234567890"} | ${true}
    ${"1+1"} | ${true}
    ${"1-1"} | ${true}
    ${"1*1"} | ${true}
    ${"(1*1)"} | ${true}
    ${"7/1"} | ${false}
    ${"74a"} | ${false}
    ${"bfbdb"} | ${false}
    `('returns $expected when $a is entered', ({a, expected}) => {
      expect(Calculate.isValid(a)).toBe(expected);
    });
  })
  
})