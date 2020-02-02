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

import xml2js from 'xml2js';
import XTreeDiff from './XTreeDiff';
import XTree, { NodeType } from './XTree';
import { typeOf } from './utils';

interface XMLNode {
  [label: string]: XMLNode | string[];
}

export const ROOT_LABEL = 'root';
// type XMLNode = Record<string, XMLNode | string[]>
const { parseString } = xml2js;
export default class XMLXTreeDiff extends XTreeDiff<string> {
  // eslint-disable-next-line class-methods-use-this
  public buildXTree(xmlStr: string): XTree {
    let xmlObj: XMLNode | null = null;
    parseString(xmlStr, {
      async: false,
    }, (err, result: XMLNode) => {
      if (!err) {
        xmlObj = result;
      } else {
        throw err;
      }
    });

    function plainObj2XTree(obj: XMLNode, index: number): XTree | XTree[] {
      if (typeOf(obj) === 'Object') {
        const result: XTree[] = [];
        Object
          .keys(obj)
          .forEach((label, keyIdx) => {
            const xmlNode = obj[label] as XMLNode;
            if (Array.isArray(xmlNode)) {
              xmlNode.forEach((child, childIdx) => {
                const childXTreeNodes = plainObj2XTree(child, childIdx);
                const xTreeNode = new XTree<XMLNode>({
                  label, index: childIdx, type: NodeType.ELEMENT, data: xmlNode,
                });
                xTreeNode.append(childXTreeNodes);
                result.push(xTreeNode);
              });
            } else {
              const childXTreeNodes = plainObj2XTree(xmlNode, keyIdx);
              const xTreeNode = new XTree<XMLNode>({
                label, index: keyIdx, type: NodeType.ELEMENT, data: xmlNode,
              });
              xTreeNode.append(childXTreeNodes);
              result.push(xTreeNode);
            }
          });
        return result;
      } else if (typeof obj === 'string') {
        return new XTree({ type: NodeType.TEXT, index, value: obj });
      }
      // actually won't came here
      throw TypeError('XMLNode Must Be Object or string[]');
    }
    const root = new XTree({ label: ROOT_LABEL, index: 1, type: NodeType.ELEMENT });
    const subtree = plainObj2XTree((xmlObj as unknown) as XMLNode, 1);
    root.append(subtree);
    return root;
  }

  // FIXME: remove return any
  // eslint-disable-next-line class-methods-use-this
  public dumpXTree(xTree: XTree): any {
    function traverse(node: XTree): string {
      if (node.type === NodeType.ELEMENT) {
        let treeStr = '';
        if (node.label !== ROOT_LABEL) {
          treeStr = `<${node.label} op="${node.Op}">`;
        }
        node.forEach((child) => {
          treeStr += traverse(child);
        });
        if (node.label !== ROOT_LABEL) {
          treeStr += `</${node.label}>`;
        }
        return treeStr;
      } else if (node.type === NodeType.TEXT) {
        return node.value;
      }
      return '';
    }

    return traverse(xTree);
  }
}
