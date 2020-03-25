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
export function createTree01(): XTree<string> {
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
export function createTree02(): XTree<string> {
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
export function createTree03(): XTree<string> {
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
export function createTree04(): XTree<string> {
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
export function createTree05(): XTree<string> {
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


/**
 * without Id
 * has a extra child node
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree06(): XTree<string> {
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
      new XTree<string>({
        label: 'd',
        type: NodeType.ELEMENT,
        index: 3,
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}


/**
 * without Id
 * missing a child node
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree07(): XTree<string> {
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
        label: 'd',
        type: NodeType.ELEMENT,
        index: 2,
        data: 'tree4-level-2-b-2',
      }),
    ],
  });
}


/**
 * without Id
 * completely different child
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree08(): XTree<string> {
  return new XTree<string>({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    data: 'tree4-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'x',
        type: NodeType.ELEMENT,
        index: 1,
        data: 'tree4-level-2-b-1',
      }),
      new XTree<string>({
        label: 'y',
        type: NodeType.ELEMENT,
        index: 3,
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
 * @returns {XTree}
 */
export function createTree09(): XTree {
  return new XTree({
    label: 'a',
    type: NodeType.ELEMENT,
    index: 1,
    children: [
      new XTree({
        label: 'd',
        type: NodeType.ELEMENT,
        index: 1,
        children: [
          new XTree({
            type: NodeType.TEXT,
            value: 'text',
            index: 1,
          }),
        ],
      }),
      new XTree({
        label: 'b',
        type: NodeType.ELEMENT,
        index: 2,
      }),
    ],
  });
}


/**
 * without Id
 * children not eqaul to tree 5
 *
 * @export
 * @returns {XTree<string>}
 */
export function createTree010(): XTree {
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
            type: NodeType.TEXT,
            value: 'text',
            index: 1,
          }),
        ],
      }),
      new XTree({
        label: 'c',
        type: NodeType.ELEMENT,
        index: 2,
      }),
    ],
  });
}

export function createTree011(): XTree<string> {
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
        children: [
          new XTree({
            type: NodeType.TEXT,
            value: 'text',
            index: 1,
          }),
        ],
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
