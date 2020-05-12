/* --------------------------------------------------------------------------*
 * Description: X-Tree Diff+ plus implement.                                 *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 1:18 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 1:20 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable class-methods-use-this */
import {
  XTreeDFTraverse,
  XTreeBFTraverse,
  // typeOf,
  XTreeDFPostOrderTraverse,
} from './utils';
import { XTree, NodeType } from './XTree';
import { EditOption } from './EditOption';

/**
 * X-Tree Diff+ plus implement.
 *
 * @export
 * @abstract
 * @class XTreeDiffPlus
 * @template T old & new tree type
 * @template S XTree data proprety type
 */
export abstract class XTreeDiffPlus<T = any, S= any> {
  /**
   * @type {Map<string, XTree<S>>}  all the nodes with unique tMD in T_new are registered to N_Htable
   */
  private N_Htable = new Map <string, XTree<S>>();

  /**
   * @type {Map<string, XTree<S>[]>}  all the nodes with non-unique tMD in T_old are registered to O_Htable
   */
  private O_Htable = new Map <string, XTree<S>[]>();

  /**
   * @type {Map<XTree<S>, XTree<S>>} [oldTreeNode, newTreeNode]
   */
  private M_List = new Map<XTree<S>, XTree<S>>();

  /**
   * @type {Map<string, XTree<S>>} iMd as key, X-tree Node as value
   */
  private N_IDHtable = new Map<string, XTree<S>>();

  protected rawOld: T;
  protected rawMew: T;

  constructor(T_old: T, T_new: T) {
    this.rawOld = T_old;
    this.rawMew = T_new;
  }

  private matchNodesWith(node1: XTree<S>, node2: XTree<S>, op: EditOption): void {
    node1.Op = op;
    node2.Op = op;
    node1.nPtr = node2;
    node2.nPtr = node1;
  }

  private matchNodeSubtreeWith(node1: XTree<S>, node2: XTree<S>, op: EditOption): void {
    const stack1 = [node1];
    const stack2 = [node2];
    while (stack1.length && stack2.length) {
      const nodeA = stack1.pop()!;
      const nodeB = stack2.pop()!;
      this.matchNodesWith(nodeA, nodeB, op);
      if (nodeA.hasChildren()) {
        nodeA.forEach(node => stack1.push(node));
      }
      if (nodeB.hasChildren()) {
        nodeB.forEach(node => stack2.push(node));
      }
    }
  }

  /**
   * propagete matching upward
   *
   * @private
   * @param {Map<XTree, XTree>} matchMap
   * @memberof XTreeDiffPlus
   */
  private matchUpward(matchMap: Map<XTree<S>, XTree<S>> | [XTree<S>, XTree<S>][]): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const [nodeA, nodeB] of matchMap) {
      let pA = nodeA.pPtr;
      let pB = nodeB.pPtr;
      while (true) {
        if (pA === null || pB === null) {
          break;
        } else if (pA.nPtr === null && pB.nPtr === null) {
          if (pA.label === pB.label) {
            this.matchNodesWith(pA, pB, EditOption.NOP);
            pA = pA.pPtr;
            pB = pB.pPtr;
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }
  }

  /**
   *
   *
   * @private
   * @param {XTree<S>} root
   * @param {(node: XTree<S>, tMD_map: Map <string, number>) => void} callback tMD_map: tMD 出现的次数
   * @returns {Map < string, number >}
   * @memberof XTreeDiffPlus
   */
  private initHtable(
    root: XTree<S>, callback: (node: XTree<S>, tMD_map: Map <string, number>) => void,
  ): Map < string, number > {
    const tMD_map = new Map <string, number>();
    XTreeDFTraverse<S>(root, (node: XTree<S>) => {
      if (tMD_map.has(node.tMD)) {
        tMD_map.set(node.tMD, (tMD_map.get(node.tMD) as number) + 1);
      } else {
        tMD_map.set(node.tMD, 1);
      }
    });

    XTreeDFTraverse<S>(root, (node: XTree<S>) => callback(node, tMD_map));
    return tMD_map;
  }

  /**
   * run diff algorithm
   *
   * @returns {{ oldTree: S; newTree: S }}
   * @memberof XTreeDiffPlus
   */
  diff(): { oldTree: S; newTree: S } {
    const { rawOld, rawMew } = this;
    const T_old = this.buildXTree(rawOld);
    const T_new = this.buildXTree(rawMew);
    // step 1 match identical subtree with 1-to-1 correspondence
    this.initHtable(T_old, (node, old_tMD_map) => {
      const isNonUnique = old_tMD_map.get(node.tMD) !== 1;
      if (isNonUnique) {
        if (this.O_Htable.has(node.tMD)) {
          const nonUniqueArr = this.O_Htable.get(node.tMD)!;
          nonUniqueArr.push(node);
        } else {
          this.O_Htable.set(node.tMD, [node]);
        }
      }
    });

    this.initHtable(T_new, (node, new_tMD_map) => {
      // dulicate node which has the same tMD
      const isUnique = new_tMD_map.get(node.tMD) === 1;
      if (isUnique) {
        this.N_Htable.set(node.tMD, node);
      }
      if (typeof node.iMD !== 'undefined') {
        this.N_IDHtable.set(node.iMD, node);
      }
    });

    XTreeBFTraverse<S>(T_old, (oNode: XTree<S>): boolean => {
      // any entry of O_Htable does NOT hava the same tMD value that the node N has
      if (!this.O_Htable.has(oNode.tMD)) { // N_node is is unique
        // any entry of N_Htable has the same tMD value that the node N has
        if (this.N_Htable.has(oNode.tMD)) {
          const nNode = this.N_Htable.get(oNode.tMD) as XTree<S>;
          // subtree node will set Op in step 3
          if (nNode.index === oNode.index) {
            this.matchNodesWith(oNode, nNode, EditOption.NOP);
          } else {
            this.matchNodesWith(oNode, nNode, EditOption.MOV);
          }
          this.M_List.set(oNode, nNode);
          return true;
        }
      }
      return false;
    });

    // matches node with the same iMD
    XTreeBFTraverse<S>(T_old, (oNode: XTree<S>) => {
      // unmatch node after preivuos sub-step
      if (!this.M_List.has(oNode)) {
        if (typeof oNode.iMD !== 'undefined') {
          if (this.N_IDHtable.has(oNode.iMD)) {
            const nNode = this.N_IDHtable.get(oNode.iMD)!;
            if (oNode.index === nNode.index) {
              this.matchNodesWith(nNode, oNode, EditOption.NOP);
            } else {
              this.matchNodesWith(nNode, oNode, EditOption.MOV);
            }
          }
        }
      }
    });

    // step 2 propagete matching upward
    this.matchUpward(this.M_List);

    // step 3 match remaining nodes downwards
    XTreeDFTraverse<S>(T_old, (nodeA: XTree<S>) => {
      if (nodeA.Op !== null) { // nodeA has been matched
        /** @type {XTree<S>[]} unmathed children of nodeA */
        const cA: XTree<S>[] = [];
        // find all unmatched child
        nodeA.forEach((child) => {
          if (child.Op === null) {
            cA.push(child);
          }
        });

        const nodeB = nodeA.nPtr;
        /** @type {XTree<S>[]} unmathed children of nodeB */
        const cB: XTree[] = [];
        // find all unmatched child
        // eslint-disable-next-line no-unused-expressions
        nodeB?.forEach((child): void => {
          if (child.Op === null) {
            cB.push(child);
          }
        });

        for (let bIdx = 0; bIdx < cB.length; bIdx++) {
          const aIdx = cA.findIndex(chidA => chidA.tMD === cB[bIdx].tMD);
          if (aIdx !== -1) {
            // sub-tree is eaual, so mark sub-tree as NOP
            this.matchNodeSubtreeWith(cA[aIdx], cB[bIdx], EditOption.NOP);
          } else {
            // https://github.com/yidafu/x-tree-diff-plus/issues/3
            cA.forEach((childA) => {
              if (bIdx >= cB.length) { return; }
              if ((childA.type === NodeType.TEXT) && (childA.type === cB[bIdx].type)) {
                // text node value alway not equal
                this.matchNodesWith(childA, cB[bIdx], EditOption.UPD);
                bIdx++;
              } else if (childA.lLabel === cB[bIdx].lLabel) {
                this.matchNodesWith(childA, cB[bIdx], EditOption.NOP);
                bIdx++;
              }
            });
          }
        }
      }
    });

    // step 4 Tune existing matches
    XTreeDFPostOrderTraverse(T_old, (node: XTree<S>) => {
      if (node.consistency < 0.5) {
        const { supportingDegree, supportingDegreeNode } = node.alernativeMetches();
        if (supportingDegreeNode
            && supportingDegree > node.positiveMatch + supportingDegreeNode.positiveMatch) {
          this.matchNodesWith(node.nPtr!, supportingDegreeNode.nPtr!, EditOption.NOP);
          this.matchNodesWith(node, supportingDegreeNode, EditOption.NOP);
        }
      }
    });

    // step 5 metch remaining identical subtree with move and copy operations
    // find all unmatch nodes
    const S_Htable: Map<string, XTree<S>[]> = new Map();
    XTreeBFTraverse(T_old, (node: XTree<S>) => {
      if (node.Op === null) {
        if (S_Htable.has(node.tMD)) {
          const S_LNp = S_Htable.get(node.tMD)!;
          S_LNp.push(node);
        } else {
          S_Htable.set(node.tMD, [node]);
        }
      }
    });
    const T_Htable: Map<string, XTree<S>[]> = new Map();
    XTreeBFTraverse(T_new, (node: XTree<S>) => {
      if (node.Op === null) {
        if (T_Htable.has(node.tMD)) {
          const T_LNp = T_Htable.get(node.tMD)!;
          T_LNp.push(node);
        } else {
          T_Htable.set(node.tMD, [node]);
        }
      }
    });

    // there are some situation:
    //  1. duplicate sub-tree in two tree
    //    1.1 the number of duplicate sub-tree is equal
    //    1.2 the number of duplicate sub-tree isn't equal
    //  2. has extra or missing sub-tree

    // 5.1 match node with the same tMD
    // eslint-disable-next-line no-restricted-syntax
    for (const [hKey, T_LNp] of T_Htable) {
      if (S_Htable.has(hKey)) {
        const S_LNp = S_Htable.get(hKey)!;
        const lnS = S_LNp?.length ?? 0;
        const lnT = T_LNp.length;
        // will match the rest sub-tree later
        const len = Math.min(lnS, lnT);
        for (let idx = 0; idx < len; idx++) {
          S_LNp[idx].nPtr = T_LNp[idx];
          T_LNp[idx].nPtr = S_LNp[idx];
          this.matchNodeSubtreeWith(S_LNp[idx], T_LNp[idx], EditOption.NOP);
          this.matchUpward([[S_LNp[idx], T_LNp[idx]]]);
        }
      }
    }

    // find out all sub-tree has equivalent parent and the same index, marked as UPD
    /** @types {Map<XTree | null, XTree[]>} key: parent nodes, value: unmatched children. */
    const S_P_Htable = new Map<XTree<S> | null, XTree<S>[]>();
    // eslint-disable-next-line no-restricted-syntax
    for (const [, nodeList] of S_Htable) {
      // eslint-disable-next-line no-restricted-syntax
      for (const node of nodeList) {
        if (node.Op === null) {
          const pNode = node.pPtr;
          if (S_P_Htable.has(pNode)) {
            S_P_Htable.get(pNode)!.push(node);
          } else {
            S_P_Htable.set(pNode, [node]);
          }
        }
      }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [, nodeList] of T_Htable) {
      // eslint-disable-next-line no-restricted-syntax
      for (const newNode of nodeList) {
        if (newNode.Op === null) {
          const expectPNode = newNode.pPtr?.nPtr;

          if (expectPNode && S_P_Htable.has(expectPNode)) {
            const oldChildren = S_P_Htable.get(expectPNode)!;
            // eslint-disable-next-line no-restricted-syntax
            for (const oldNode of oldChildren) {
              if (newNode.index === oldNode.index) {
                this.matchNodesWith(oldNode, newNode, EditOption.UPD);
              } else if (newNode.label === oldNode.label) {
                this.matchNodesWith(oldNode, newNode, EditOption.MOV);
              }
            }
          }
        }
      }
    }

    // rest sub-tree marked as DEL or INS
    XTreeBFTraverse(T_old, (node: XTree<S>) => {
      if (node.Op === null) {
        node.Op = EditOption.DEL;
      }
    });
    XTreeBFTraverse(T_new, (node: XTree<S>) => {
      if (node.Op === null) {
        node.Op = EditOption.INS;
      }
    });

    return this.dumpXTree(T_old, T_new);
  }

  /**
   * buid XFree from source Tree type
   *
   * @abstract
   * @param {T} rawTree
   * @returns {XTree<S>}
   * @memberof XTreeDiffPlus
   */
  public abstract buildXTree(rawTree: T): XTree<S>;

  /**
   * dump XTree to target tree type
   *
   * @abstract
   * @param {XTree<S>} oldTree
   * @param {XTree<S>} newTree
   * @returns {{ oldTree: any; newTree: any }}
   * @memberof XTreeDiffPlus
   */
  public abstract dumpXTree(oldTree: XTree<S>, newTree: XTree<S>): { oldTree: any; newTree: any };
}
