import {
  NodeType,
  XTree,
} from '../src';

export function createTree31(): XTree<string> {
  // old Tree:  <div>This is a good test.</div>

  return new XTree<string>({
    label: 'DIV',
    type: NodeType.ELEMENT,
    index: 0,
    children: [
      new XTree<string>({
        label: '#TEXT-ROOT',
        type: NodeType.ELEMENT,
        index: 0,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 0,
            value: 'This',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'is',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 2,
            value: 'a',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 3,
            value: 'good',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 4,
            value: 'test.',
          }),
        ],
      }),
    ],
  });
}


export function createTree32(): XTree<string> {
  // old Tree:  <div>This is a<b>very good</b>test.</div>

  return new XTree<string>({
    label: 'DIV',
    type: NodeType.ELEMENT,
    index: 0,
    children: [
      new XTree<string>({
        label: '#TEXT-ROOT',
        type: NodeType.ELEMENT,
        index: 0,
        children: [
          new XTree({
            type: NodeType.TEXT,
            index: 0,
            value: 'This',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 1,
            value: 'is',
          }),
          new XTree({
            type: NodeType.TEXT,
            index: 2,
            value: 'a',
          }),
        ],
      }),
      new XTree<string>(
        {
          label: 'B',
          type: NodeType.ELEMENT,
          index: 1,
          children: [
            new XTree<string>(
              {
                type: NodeType.TEXT,
                value: 'very',
                index: 0,
              },
            ),
            new XTree<string>(
              {
                type: NodeType.TEXT,
                value: 'good',
                index: 1,
              },
            ),
          ],
        },
      ),

      new XTree<string>(
        {
          label: '#TEXT-ROOT',
          type: NodeType.ELEMENT,
          index: 2,
          children: [
            new XTree<string>(
              {
                type: NodeType.TEXT,
                value: 'test.',
                index: 1,
              },
            ),
          ],
        }),

    ],

  });
}
