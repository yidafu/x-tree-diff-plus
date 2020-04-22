# x-tree-diff-plus

<p style="text-align: center;">
  <img src="https://travis-ci.com/yidafu/x-tree-diff-plus.svg?branch=master" />
  <a href="https://codecov.io/gh/yidafu/x-tree-diff-plus">
    <img src="https://codecov.io/gh/yidafu/x-tree-diff-plus/branch/master/graph/badge.svg" />
  </a>
  <a href="https://www.npmjs.com/package/@dovyih/x-tree-diff-plus">
    <img src="https://img.shields.io/npm/dt/@dovyih/x-tree-diff-plus.svg" />
  </a>
  <img src="https://img.shields.io/npm/l/@dovyih/x-tree-diff-plus.svg" />
  <a href="https://www.npmjs.com/package/@dovyih/x-tree-diff-plus">
    <img src="https://img.shields.io/npm/v/@dovyih/x-tree-diff-plus.svg" />
  </a>
  <img src="https://img.shields.io/badge/language-typescript-blue.svg" />
</p>

X-Tree Diff+ alogrithm. [PDF](https://link.springer.com/chapter/10.1007/11802167_104)

## data structure

`XTree`:

| property | description |
| --- | --- |
| id | node id |
| label | Node Label |
| type | Node Type. Text or Element |
| value | Text Node value |
| index | Node index |
| nMD | node message digest |
| tMD | tree mssage digest |
| iMD | node Id message digest, uniquely identify each node |
| nPtr | node pointer to matched node |
| Op | edit operation |
| data | extra data field, you can assign origin Node here |

## Usage

You need implement `XTreeDiffPlus#buildTree` and `XTreeDiffPlus#dumpTree` first.

Like this:

```ts
import { XTreeDiffPlus, XTree } from '@dovyih/x-tree-diff-plus';
class DefaultXTreeDiff extends XTreeDiffPlus<XTree, string> {
  public buildXTree(tree: XTree) {
    return tree;
  }
  
  public dumpXTree(oldTree: XTree<string>, newTree: XTree<string>): { oldTree: XTree<string>, newTree: XTree<string>} {
    return { oldTree, newTree };
  }
}

// <A>
//   <B></B>
//   <B></B>
// </A>
const tree1 = new XTree<string>({
    label: 'A',
    type: NodeType.ELEMENT,
    index: 1,
    id: 'a1',
    data: 'tree2-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'B',
        type: NodeType.ELEMENT,
        index: 1,
        id: 'b1',
        data: 'tree2-level-2-b-1',
      }),
      new XTree<string>({
        label: 'B',
        type: NodeType.ELEMENT,
        index: 2,
        id: 'b2',
        data: 'tree2-level-2-b-2',
      }),
    ],
  });


// <A>
//   <B></B>
//   <C></C>
// </A>
const tree2 =  new XTree<string>({
    label: 'A',
    type: NodeType.ELEMENT,
    index: 1,
    id: 'a1',
    data: 'tree2-level-1-a-1',
    children: [
      new XTree<string>({
        label: 'B',
        type: NodeType.ELEMENT,
        index: 1,
        id: 'b1',
        data: 'tree2-level-2-b-1',
      }),
      new XTree<string>({
        label: 'C',
        type: NodeType.ELEMENT,
        index: 2,
        id: 'c2',
        data: 'tree2-level-2-b-2',
      }),
    ],
  });
}

new DefaultXTreeDiff(tree1, tree2).diff();
// result:
//
// <A Op=NOP>
//   <B Op=NOP></B>
//   <B Op=UPD></B>
// </A>
//
// <A Op=NOP>
//   <B Op=NOP></B>
//   <C Op=UPD></C>
// </A>
```
