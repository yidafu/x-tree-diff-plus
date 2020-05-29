/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 24th March 2020 10:23 pm                           *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 24th March 2020 10:23 pm                          *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { XTree, NodeType } from '../src/XTree';

export function createTree11(): XTree {
  return new XTree({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
        ],
      }),
      new XTree({
        label: 'd',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
        ],
      }),
    ],
  });
}


export function createTree12(): XTree {
  return new XTree({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
        ],
      }),
      new XTree({
        label: 'e',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'c',
            type: NodeType.ELEMENT,
            index: 1,
          }),
        ],
      }),
    ],
  });
}


export function createTree13(): XTree {
  return new XTree({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
      }),
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
      }),
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
      }),
    ],
  });
}
