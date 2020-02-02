/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 11:43 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { typeOf } from "./utils";

describe('utils typeOf', () => {
  test('typeOf({})', () => {
    expect(typeOf({})).toBe('Object');
  });

  test('typeOf([])', () => {
    expect(typeOf([])).toBe('Array');
  });

  test('typeOf(\'str\')', () => {
    expect(typeOf('str')).toBe('String');
  });

  test('typeOf(true)', () => {
    expect(typeOf(true)).toBe('Boolean');
  });

  test('typeOf(null)', () => {
    expect(typeOf(null)).toBe('Null');
  });

  test('typeOf(undefined)', () => {
    expect(typeOf(undefined)).toBe('Undefined');
  });
});