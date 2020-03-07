import XTree, { NodeType } from '../src/XTree';

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 7th March 2020 4:03 pm                            *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 7th March 2020 4:03 pm                           *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2020 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

export function createOldTree(): XTree<void> {
  return new XTree<void>({
    label: 'Actors',
    index: 1,
    type: NodeType.ELEMENT,
    children: [
      new XTree<void>({
        label: 'Actor',
        index: 1,
        type: NodeType.ELEMENT,
        children: [
          new XTree<void>({
            label: 'Name',
            index: 1,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'FirstName',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Mike',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'LastName',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Johnson',
                  }),
                ],
              }),
            ],
          }),
          new XTree<void>({
            label: 'Movie',
            index: 2,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'Title',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie1',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie2',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 3,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie3',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new XTree<void>({
        label: 'Actor',
        index: 2,
        type: NodeType.ELEMENT,
        children: [
          new XTree<void>({
            label: 'Name',
            index: 1,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'FirstName',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Mike',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'LastName',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Goodman',
                  }),
                ],
              }),
            ],
          }),
          new XTree<void>({
            label: 'Movie',
            index: 2,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'Title',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie1',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie2',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 3,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie3',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}


export function createNewTree(): XTree<void> {
  return new XTree<void>({
    label: 'Actors',
    index: 1,
    type: NodeType.ELEMENT,
    children: [
      new XTree<void>({
        label: 'Actor',
        index: 1,
        type: NodeType.ELEMENT,
        children: [
          new XTree<void>({
            label: 'Name',
            index: 1,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'FirstName',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Mike',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'LastName',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Johnson',
                  }),
                ],
              }),
            ],
          }),
          new XTree<void>({
            label: 'Movie',
            index: 2,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'Title',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie4',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie2',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      new XTree<void>({
        label: 'Actor',
        index: 2,
        type: NodeType.ELEMENT,
        children: [
          new XTree<void>({
            label: 'Name',
            index: 1,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'FirstName',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Bill',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'LastName',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Goodman',
                  }),
                ],
              }),
            ],
          }),
          new XTree<void>({
            label: 'Movie',
            index: 2,
            type: NodeType.ELEMENT,
            children: [
              new XTree<void>({
                label: 'Title',
                index: 1,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie1',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 2,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie2',
                  }),
                ],
              }),
              new XTree<void>({
                label: 'Title',
                index: 3,
                type: NodeType.ELEMENT,
                children: [
                  new XTree<void>({
                    index: 1,
                    type: NodeType.TEXT,
                    value: 'Movie3',
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
