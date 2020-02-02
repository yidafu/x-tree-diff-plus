/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 27th December 2019 10:45 pm                         *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 27th December 2019 10:45 pm                        *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XTree, { NodeType } from '../src/XTree';

/**
 *
 *
 * @export
 * @returns {XTree}
 */
export default function createTree3(): XTree {
  const a1 = new XTree({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
  });

  const b1 = new XTree({
    label: 'b',
    type: NodeType.ELEMENT,
    index: 1,
  });

  const h2 = new XTree({
    label: 'h',
    type: NodeType.ELEMENT,
    index: 2,
  });

  const c1 = new XTree({
    label: 'c',
    type: NodeType.ELEMENT,
    index: 1,
  });

  const f = new XTree({
    label: 'f',
    type: NodeType.ELEMENT,
    index: 1,
  });

  const h2$ = new XTree({
    label: 'h',
    type: NodeType.ELEMENT,
    index: 2,
  });

  const text1 = new XTree({
    type: NodeType.TEXT,
    value: 'text1',
    index: 1,
  });

  const text2 = new XTree({
    type: NodeType.TEXT,
    value: 'text2',
    index: 2,
  });

  const text3 = new XTree({
    type: NodeType.TEXT,
    value: 'text_old',
    index: 1,
  });

  const h2$$ = new XTree({
    label: 'h',
    type: NodeType.ELEMENT,
    index: 2,
  });

  /*
        a
       /  \
      b    h
    /  \    \
   c    h    f
 / \        / \
#1 #2      #n  h
*/
  const tree = a1;
  tree.append(b1);
  tree.append(h2);

  b1.append(c1);
  b1.append(h2$);
  h2.append(f);

  c1.append(text1);
  c1.append(text2);
  f.append(text3);
  f.append(h2$$);
  return tree;
}
