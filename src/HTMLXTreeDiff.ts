/* eslint-disable no-unused-expressions */
/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Staturday, 28th December 2019 10:30 am                      *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Staturday, 28th December 2019 10:30 am                     *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import XTreeDiff from './XTreeDiff';
import XTree, { NodeType } from './XTree';

const DOM_ELEMENT_TYPE = 1;
const DOM_TEXT_TYPE = 3;

export default class HMLTXTreeDiff extends XTreeDiff<HTMLElement, HTMLElement> {
  // eslint-disable-next-line class-methods-use-this
  public buildXTree(domNode: HTMLElement): XTree {
    if (!(domNode instanceof HTMLElement)) {
      throw TypeError('param `domNode` must be HTMLElement');
    }

    function dom2XTree(node: Node, index: number): XTree<Node> {
      let xTreeNode: XTree<Node>;
      switch (node.nodeType) {
        case DOM_ELEMENT_TYPE: {
          xTreeNode = new XTree({
            label: (node as HTMLElement).tagName, index, type: NodeType.ELEMENT, data: node,
          });
          if (node.hasChildNodes()) {
            const children = node.childNodes;
            for (let i = 0; i < children.length; i++) {
              const child = children[i];
              const childXTreeNode = dom2XTree(child, i);
              xTreeNode.append(childXTreeNode);
            }
          }
          break;
        }
        case DOM_TEXT_TYPE: {
          xTreeNode = new XTree<Node>({
            type: NodeType.TEXT, index, value: node.nodeValue ?? '', data: node,
          });
          break;
        }
        default:
          // actually won't came here
          throw TypeError('XMLNode Must Be Object or string[]');
      }
      return xTreeNode;
    }

    const root = dom2XTree(domNode as Node, 1);
    return root;
  }

  // eslint-disable-next-line class-methods-use-this
  public dumpXTree(xTree: XTree<HTMLElement>): HTMLElement {
    function traverse(node: XTree<HTMLElement>): void {
      if (node.type === NodeType.ELEMENT) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        node.data.setAttribute('op', String(node.Op));
        node.forEach((child) => {
          traverse(child);
        });
      } else if (node.type === NodeType.TEXT) {
        // TODO: Text Diff
      }
    }

    traverse(xTree);
    return xTree.data;
  }
}
