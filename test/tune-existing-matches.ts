/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Tuesday, 10th March 2020 9:45 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Tuesday, 10th March 2020 9:45 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { XTree, NodeType } from '../src/XTree';

export function createOldTree(): XTree {
  return new XTree({
    label: 'root',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'apple',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          // new XTree({
          //   label: 'orange',
          //   type: NodeType.ELEMENT,
          //   index: 1,
          //   children: [
          new XTree({
            label: 'watermelon',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'pineapple',
            type: NodeType.ELEMENT,
            index: 2,
          }),
          new XTree({
            label: 'pear',
            type: NodeType.ELEMENT,
            index: 3,
          }),
          new XTree({
            label: 'strawberry',
            type: NodeType.ELEMENT,
            index: 4,
          }),
        ],
        //   }),
        // ],
      }),
      new XTree({
        label: 'cherry',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            label: 'grape',
            type: NodeType.ELEMENT,
            index: 1,
          }),
        ],
      }),
    ],
  });
}

export function createNewTree(): XTree {
  return new XTree({
    label: 'root',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'apple',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          // new XTree({
          //   label: 'orange',
          //   type: NodeType.ELEMENT,
          //   index: 1,
          //   children: [
          new XTree({
            label: 'watermelon',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          //   ],
          // }),
        ],
      }),
      new XTree({
        label: 'cherry',
        type: NodeType.ELEMENT,
        index: 2,
        children: [
          new XTree({
            label: 'pineapple',
            type: NodeType.ELEMENT,
            index: 1,
          }),
          new XTree({
            label: 'pear',
            type: NodeType.ELEMENT,
            index: 2,
          }),
          new XTree({
            label: 'strawberry',
            type: NodeType.ELEMENT,
            index: 3,
          }),
          new XTree({
            label: 'grape',
            type: NodeType.ELEMENT,
            index: 4,
          }),
        ],
      }),
    ],
  });
}
