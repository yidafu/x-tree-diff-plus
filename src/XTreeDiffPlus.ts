/* --------------------------------------------------------------------------*
 * Description:                                                              *
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
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {
  XTreeDFTraverse,
  XTreeBFTraverse,
  // typeOf,
  XTreeDFPostOrderTraverse,
} from './utils';
import XTree from './XTree';
import EditOption from './EditOption';

export default abstract class XTreeDiffPlus<T = any, S= any> {
  /** @types {Map<string, XTree<S>>}  all the nodes with unique tMD in T_new are registered to N_Htable  */
  private N_Htable = new Map <string, XTree<S>>();

  /** @types {Map<string, XTree<S>[]>}  all the nodes with non-unique tMD in T_old are registered to O_Htable  */
  private O_Htable = new Map <string, XTree<S>[]>();

  /** @types {Map<XTree<S>, XTree<S>>} [oldTreeNode, newTreeNode] */
  private M_List = new Map<XTree<S>, XTree<S>>();

  /** @type {Map<string, XTree<S>>} iMd as key, X-tree Node as value  */
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
      const nodeA = stack1.pop() as XTree<S>;
      const nodeB = stack2.pop() as XTree<S>;
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
   *
   *
   * @private
   * @param {XTree<S>} root
   * @param {(node: XTree<S>, tMD_map: Map <string, number>) => void} callback tMD_map: tMD 出现的次数
   * @returns {Map < string, number >}
   * @memberof XTreeDiffPlus
   */
  private initHtable(
    root: XTree<S>, callback: (node: XTree<S>, tMD_map: Map < string, number >) => void,
  ): Map < string, number > {
    const tMD_map = new Map < string,
      number >();
    XTreeDFTraverse<S>(root, (node: XTree<S>) => {
      if (tMD_map.has(node.tMD)) {
        tMD_map.set(node.tMD, (tMD_map.get(node.tMD) as number) + 1);
      } else {
        tMD_map.set(node.tMD, 1);
      }
    });

    XTreeDFTraverse<S>(root, (node: XTree) => callback(node, tMD_map));
    return tMD_map;
  }

  diff(): { oldTree: S; newTree: S } {
    const { rawOld, rawMew } = this;
    const T_old = this.buildXTree(rawOld);
    const T_new = this.buildXTree(rawMew);
    // step 1 match identical subtree with 1-to-1 correspondence
    this.initHtable(T_old, (node, old_tMD_map) => {
      const isNonUnique = old_tMD_map.get(node.tMD) !== 1;
      if (isNonUnique) {
        if (this.O_Htable.has(node.tMD)) {
          const nonUniqueArr = this.O_Htable.get(node.tMD) as XTree[];
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
          const M_node = this.N_Htable.get(oNode.tMD) as XTree<S>;
          // subtree node will set Op in step 3
          this.matchNodesWith(oNode, M_node, EditOption.NOP);
          this.M_List.set(oNode, M_node);
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
            nNode.Op = EditOption.NOP;
            nNode.nPtr = oNode;
            oNode.nPtr = nNode;
          }
        }
      }
    });

    // step 2 propagete matching upward
    // eslint-disable-next-line no-restricted-syntax
    for (const [nodeA, nodeB] of this.M_List) {
      let pA: XTree = nodeA.pPtr as XTree<S>;
      let pB: XTree = nodeB.pPtr as XTree<S>;
      while (true) {
        if (pA === null && pB === null) {
          break;
        }
        if (pA.nPtr === null && pB.nPtr === null) {
          if (pA.label === pB.label) {
            this.matchNodesWith(pA, pB, EditOption.NOP);
            pA = pA.pPtr as XTree<S>;
            pB = pB.pPtr as XTree<S>;
          } else {
            break;
          }
        } else {
          break;
        }
      }
    }

    // step 3 match remaining nodes downwards
    XTreeDFTraverse<S>(T_old, (nodeA: XTree<S>) => {
      if (nodeA.Op !== null) { // nodeA has been matched
        /** @type {XTree<S>[]} unmathed children of nodeA */
        const cA: XTree<S>[] = [];
        // find all unmatched child
        nodeA.forEach((child) => {
          if (child.nPtr === null) {
            cA.push(child);
          }
        });

        const nodeB = nodeA.nPtr;
        /** @type {XTree<S>[]} unmathed children of nodeB */
        const cB: XTree[] = [];
        // find all unmatched child
        // eslint-disable-next-line no-unused-expressions
        nodeB?.forEach((child): void => {
          if (child.nPtr === null) {
            cB.push(child);
          }
        });

        for (let bIdx = 0; bIdx < cB.length; bIdx++) {
          const aIdx = cA.findIndex(chidA => chidA.tMD === cB[bIdx].tMD);
          if (aIdx !== -1) {
            this.matchNodeSubtreeWith(cA[aIdx], cB[bIdx], EditOption.NOP);
          } else {
            const alLabelIdx = cA.findIndex(childA => childA.lLabel === cB[bIdx].lLabel);
            if (alLabelIdx !== -1) {
              if (cA[alLabelIdx].value === cB[bIdx].value) {
                this.matchNodesWith(cA[alLabelIdx], cB[bIdx], EditOption.NOP);
              }
            }
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
          node.Op = EditOption.NOP;
          supportingDegreeNode.Op = EditOption.NOP;
          node.nPtr = supportingDegreeNode;
        }
      }
    });
    // step 5 metch remaining identical subtree with move and copy operations
    const S_Htable: Map<string, XTree[]> = new Map();
    XTreeBFTraverse(T_old, (node: XTree) => {
      if (node.Op === null) {
        if (S_Htable.has(node.tMD)) {
          const T_LNp = S_Htable.get(node.tMD);
          if (T_LNp) {
            T_LNp.push(node);
          }
        } else {
          S_Htable.set(node.tMD, [node]);
        }
      }
    });
    const T_Htable: Map<string, XTree[]> = new Map();
    XTreeBFTraverse(T_new, (node: XTree) => {
      if (node.Op === null) {
        if (T_Htable.has(node.tMD)) {
          const T_LNp = T_Htable.get(node.tMD);
          if (T_LNp) {
            T_LNp.push(node);
          }
        } else {
          T_Htable.set(node.tMD, [node]);
        }
      }
    });

    // eslint-disable-next-line no-restricted-syntax
    for (const [hKey, T_LNp] of T_Htable) {
      if (S_Htable.has(hKey)) {
        const S_LNp = S_Htable.get(hKey)!;
        const lnT = T_LNp.length;
        const lnS = S_LNp?.length ?? 0;
        if (lnS < lnT) {
          for (let idxS = 0; idxS < lnS - 1; idxS++) {
            S_LNp[idxS].nPtr = T_LNp[idxS];
          }
          for (let idxT = lnS - 1; idxT < lnT; idxT++) {
            T_LNp[idxT].Op = EditOption.CPY;
            T_LNp[idxT].nPtr = S_LNp[lnS - 1] ?? null;
          }
        }
        if (lnS > lnT) {
          S_LNp[0].Op = EditOption.MOV;
          S_LNp[0].nPtr = T_LNp[0];
          // for (let idxT = 0; idxT < lnT; idxT++) {
          // }
        }
      }
      // else {
      //   T_LNp.forEach((node) => {
      //     node.Op = EditOption.INS;
      //   });
      // }
    }
    const oldTree = this.dumpXTree(T_old);
    const newTree = this.dumpXTree(T_new);
    return {
      oldTree, newTree,
    };
  }

  public abstract buildXTree(rawTree: T): XTree<S>;

  public dumpXTree(xTree: XTree<S>): any {
    return xTree;
  }
}
