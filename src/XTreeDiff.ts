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
import XTree from './XTree';
import {
  XTreeDFTraverse,
  XTreeBFTraverse,
} from './utils';
import EditOption from './EditOption';

export default abstract class XTreeDiff<T = any, S= any> {
  /** @types {Map<string, XTree>}  all the nodes with unique tMD in T_new are registered to N_Htable  */
  private N_Htable = new Map < string, XTree<S> >();

  /** @types {Map<string, XTree>}  all the nodes with non-unique tMD in T_old are registered to O_Htable  */
  private O_Htable = new Map < string, XTree<S>[] >();

  private M_List = new Map < XTree<S>, XTree<S> >();

  protected rawOld: T;
  protected rawMew: T;

  constructor(T_old: T, T_new: T) {
    this.rawOld = T_old;
    this.rawMew = T_new;
  }

  private matchNodes(node1: XTree<S>, node2: XTree<S>, op: EditOption): void {
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
      this.matchNodes(nodeA, nodeB, op);
      if (nodeA.hasChildren()) {
        nodeA.forEach(node => stack1.push(node));
      }
      if (nodeB.hasChildren()) {
        nodeB.forEach(node => stack2.push(node));
      }
    }
  }

  private initHtable(
    root: XTree<S>, callback: (node: XTree<S>, tMD_map: Map < string, number >) => void,
  ): Map < string, number > {
    const tMD_map = new Map < string,
      number >();
    XTreeDFTraverse(root, (node) => {
      if (tMD_map.has(node.tMD)) {
        tMD_map.set(node.tMD, (tMD_map.get(node.tMD) as number) + 1);
      } else {
        tMD_map.set(node.tMD, 1);
      }
    });

    XTreeDFTraverse(root, node => callback(node, tMD_map));
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
    });

    XTreeDFTraverse(T_old, (N_node: XTree): boolean => {
      if (!this.O_Htable.has(N_node.tMD)) {
        if (this.N_Htable.has(N_node.tMD)) {
          const M_node = this.N_Htable.get(N_node.tMD) as XTree;
          // subtree node will set Op in step 3
          this.matchNodes(N_node, M_node, EditOption.NOP);
          this.M_List.set(N_node, M_node);
          return true;
        }
      }
      return false;
    });

    // step 2 propagete matching upward

    // eslint-disable-next-line no-restricted-syntax
    for (const [A, B] of this.M_List) {
      let pA: XTree = A.pPtr as XTree;
      let pB: XTree = B.pPtr as XTree;
      while (true) {
        if (pA === null && pB === null) {
          break;
        }
        if (pA.nPtr === null && pB.nPtr === null) {
          if (pA.label === pB.label) {
            this.matchNodes(pA, pB, EditOption.NOP);
            pA = pA.pPtr as XTree;
            pB = pB.pPtr as XTree;
          } else {
            this.matchNodes(A, B, EditOption.MOV);
            break;
          }
        } else {
          if (pA.pPtr !== null && pA.nPtr !== pB) {
            this.matchNodes(A, B, EditOption.MOV);
          } else if (pB.pPtr !== null && pB.nPtr !== pA) {
            this.matchNodes(A, B, EditOption.MOV);
          }
          break;
        }
      }
    }

    // step 3 match remaining nodes
    XTreeDFTraverse(T_old, (nodeA: XTree) => {
      if (nodeA.nPtr !== null) { // nodeA has been matched
        const cA: XTree[] = [];
        // find all unmatched child
        nodeA.forEach((child) => {
          if (child.nPtr === null) {
            cA.push(child);
          }
        });

        const nodeB = nodeA.nPtr;
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
                this.matchNodes(cA[alLabelIdx], cB[bIdx], EditOption.NOP);
              } else {
                this.matchNodes(cA[alLabelIdx], cB[bIdx], EditOption.UPD);
              }
            }
          }
        }
      }
    });

    // step 4  determine node for addition and deletion
    XTreeBFTraverse(T_old, (node: XTree) => {
      if (node.nPtr === null) {
        node.Op = EditOption.DEL;
      }
    });
    XTreeBFTraverse(T_new, (node: XTree) => {
      if (node.nPtr === null) {
        node.Op = EditOption.INS;
      }
    });

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
