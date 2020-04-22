/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Wednesday, 22nd April 2020 4:18 pm                          *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Wednesday, 22nd April 2020 4:18 pm                         *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { XTree, NodeType } from '../src/XTree';

/**
 * with text node
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree21(): XTree<string> {
  return new XTree<string>({
    label: 'DIV',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'hey!',
          }),
        ],
      }),
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'well done!',
          }),
        ],
      }),
    ],
  });
}


/**
 * with text node
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree22(): XTree<string> {
  return new XTree<string>({
    label: 'DIV',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'hey!',
          }),
        ],
      }),
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'great work!',
          }),
        ],
      }),
    ],
  });
}


/**
 * with text node
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree23(): XTree<string> {
  return new XTree<string>({
    label: 'DIV',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'hey!',
          }),
        ],
      }),
      new XTree<string>({
        label: 'H1',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'hey!',
          }),
        ],
      }),
    ],
  });
}

