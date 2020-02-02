/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 3:41 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 3:42 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XTree, { NodeType } from './XTree';

describe('XTree', () => {
  test('one node', () => {
    const a = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    const a2 = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    expect(a.lLabel).toBe(a2.lLabel);
    expect(a.nId).toBe(a2.nId);
    expect(a.nMD).toBe(a2.nMD);
    expect(a.tMD).toBe(a2.tMD);
  });


  test('a child node', () => {
    const a1 = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    const child1 = new XTree({
      label: 'child',
      type: NodeType.ELEMENT,
      index: 1,
    });
    a1.append(child1);

    const a2 = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    const child2 = new XTree({
      label: 'child',
      type: NodeType.ELEMENT,
      index: 1,
    });
    a2.append(child2);
    expect(child1.lLabel).toBe(child2.lLabel);
    expect(child1.nId).toBe('.a[1].child[1]');
    expect(child1.nId).toBe(child2.nId);
    expect(child1.nMD).toBe(child2.nMD);
    expect(child1.tMD).toBe(child2.tMD);
  });


  test('a text child node', () => {
    const a1 = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    const child1 = new XTree({
      value: 'child',
      type: NodeType.TEXT,
      index: 1,
    });
    a1.append(child1);

    const a2 = new XTree({
      label: 'a',
      type: NodeType.ELEMENT,
      index: 1,
    });
    const child2 = new XTree({
      value: 'child',
      type: NodeType.TEXT,
      index: 1,
    });
    a2.append(child2);
    expect(child1.lLabel).toBe(child2.lLabel);
    expect(child1.nId).toBe('.a[1].#TEXT[1]');
    expect(child1.nId).toBe(child2.nId);
    expect(child1.nMD).toBe(child2.nMD);
    expect(child1.tMD).toBe(child2.tMD);
  });
});
