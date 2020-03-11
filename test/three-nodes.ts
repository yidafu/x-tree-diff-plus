/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Friday, 6th March 2020 9:37 pm                              *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Friday, 6th March 2020 9:37 pm                             *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import { XTree, NodeType } from '../src/XTree';

/**
 * example
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree1(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    id: 'a1',
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        id: 'b1',
        data: 'tree4-level-2-b-1',
      }),
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
        id: 'b2',
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}

/**
 * modify the second children node compared with tree1
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree2(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    id: 'a1',
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        id: 'b1',
        data: 'tree4-level-2-b-1',
      }),
      new XTree<string>({
        label: 'c',
        type: NodeType.ELEMENT,
        index: 2,
        id: 'c2',
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}

/**
 * swap the order of children compared with tree2
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree3(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    id: 'a1',
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'c',
        type: NodeType.ELEMENT,
        index: 1,
        id: 'c2',
        data: 'tree4-level-2-b-2',
      }),
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
        id: 'b1',
        data: 'tree4-level-2-b-1',
      }),
    ],
  });
}


/**
 * without Id
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree4(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        data: 'tree4-level-2-b-1',
      }),
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}


/**
 * without Id
 * modify the second children node compared with tree1
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree5(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 1,
        data: 'tree4-level-2-b-1',
      }),
      new XTree<string>({
        label: 'c',
        type: NodeType.ELEMENT,
        index: 2,
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}
