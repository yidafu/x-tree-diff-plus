/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 1:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 1:21 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */

import EditOption from './EditOption';
import md4 from './md4';
import { typeOf, Memo } from './utils';

export enum NodeType {
  ELEMENT = 'ELEMENT',
  TEXT = '#TEXT',
}


interface IBaseParam<T> {
  index: number;
  type: NodeType;
  data?: T;
}

interface INodeParam<T> extends IBaseParam<T> {
  id?: string;
  label: string;
  type: NodeType.ELEMENT;
  children?: XTree<T>[];
}

interface ITextParam<T> extends IBaseParam<T> {
  type: NodeType.TEXT;
  value: string;
}

// FIXME: there T should keep the same with XTree<T>
export type IXTreeConstructorParam<T = any> = INodeParam<T> | ITextParam<T>;

export default class XTree<T = any> {
  /** @type {string} */
  id?: string;

  /**
   * node tag name
   *
   * @type {string}
   * @memberof XTree
   */
  public label = '';

  /**
   * node type element or text
   *
   * @type {string}
   * @memberof XTree
   */
  public type: NodeType;

  /**
   * text value
   *
   * @type {string}
   * @memberof XTree
   */
  public value: string | null = null;

  /**
   * child index
   *
   * @type {number}
   * @memberof XTree
   */
  public index: number;

  /**
   * node message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  @Memo
  public get nMD(): string {
    return md4(this.label + this.value ?? '');
  }

  /**
   * tree message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  @Memo
  public get tMD(): string {
    let tMD = this.nMD;
    this.children.forEach((child) => {
      tMD += child.tMD;
    });
    return md4(tMD);
  }

  /**
   * uniquely identify each node
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  @Memo
  public get iMD(): string | undefined {
    if (typeof this.id !== 'undefined') {
      return md4(this.label + this.id);
    }
    return undefined;
  }

  /**
   * node pointer to anther XTree
   *
   * @type {XTree}
   * @memberof XTree
   */
  public nPtr: XTree | null = null;

  /**
   * edit option
   *
   * @type {EditOption}
   * @memberof XTree
   */
  public Op: EditOption | null = null;


  /**
   * index label
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get lLabel(): string {
    return `.${this.label}[${this.index}]`;
  }

  /**
   * node indentifer
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get nId(): string {
    if (this.pPtr) {
      return `${this.pPtr.nId}${this.lLabel}`;
    }
    return `${this.lLabel}`;
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof XTree
   */
  @Memo
  public get positiveMatch(): number {
    let positiveMatch = 0;
    this.forEach((node) => {
      if (this.nPtr && this.nPtr === node.nPtr?.pPtr) {
        positiveMatch++;
      }
    });
    return positiveMatch;
  }

  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof XTree
   */
  @Memo
  public get negativeMatch(): number {
    let negativeMatch = 0;
    this.forEach((node) => {
      if (this.nPtr && this.nPtr !== node?.nPtr?.pPtr) {
        negativeMatch++;
      }
    });
    return negativeMatch;
  }
  /**
   *
   *
   * @readonly
   * @type {number}
   * @memberof XTree
   */
 @Memo
  public get consistency(): number {
    const positiveMatch = this.positiveMatch;
    const negativeMatch = this.negativeMatch;
    if (positiveMatch + negativeMatch === 0) {
      return Infinity;
    }
    // FIXMEL negativeMatch may == 0
    return positiveMatch / (positiveMatch + negativeMatch);
  }

 public alernativeMetches(): {supportingDegree: number; supportingDegreeNode: XTree | null } {
   /** @type {XTree[]} the list of alernative metches */
   const lAM: Map<XTree, number> = new Map();
   this.forEach((node) => {
     // am ==> alernativeMetch
     const am = node?.nPtr?.pPtr;
     if (am && am !== this.nPtr && am.label !== this.label) {
       if (lAM.has(am)) {
         lAM.set(am, (lAM.get(am) || 0) + 1);
       } else {
         lAM.set(am, 1);
       }
     }
   });
   let supportingDegree = 0;
   let supportingDegreeNode = null;
   // eslint-disable-next-line no-restricted-syntax
   for (const [node, value] of lAM) {
     if (supportingDegree < value) {
       supportingDegreeNode = node;
       supportingDegree = value;
     }
   }
   return {
     supportingDegree,
     supportingDegreeNode,
   };
 }
  /**
   * children list container
   *
   * @private
   * @type {XTree[]}
   * @memberof XTree
   */
  private children: XTree[] = [];

  /**
   * pointer to parent XTree
   *
   * @type {(XTree | null)}
   * @memberof XTree
   */
  public pPtr: XTree | null = null;

  /**
   * extensible property.
   * you can save original node to this property
   *
   * @type {T}
   * @memberof XTree
   */
  public data: T;

  constructor(param: IXTreeConstructorParam) {
    this.index = param.index;
    this.type = param.type;
    this.data = param.data;
    if (param.type === NodeType.ELEMENT) {
      this.id = param.id;
      this.label = param.label;
      if (Array.isArray(param.children)) {
        this.append(param.children);
      }
    } else {
      this.label = NodeType.TEXT;
      this.value = param.value;
    }
  }

  public append(children: XTree | XTree[]): void {
    const append = (child: XTree): void => {
      if (child instanceof XTree) {
        child.pPtr = this;
        this.children.push(child);
      } else {
        throw TypeError(`Child must be XTree<T>, not ${typeOf(child)}`);
      }
    };
    if (Array.isArray(children)) {
      children.forEach(append);
    } else {
      append(children);
    }
  }

  public forEach(callback: (node: XTree, index: number, thisArg: XTree) => void): void {
    this.children.forEach((child) => {
      callback(child, child.index, this);
    });
  }

  public hasChildren(): boolean {
    return this.children.length !== 0;
  }

  public getChild(idx: number): XTree | null {
    if (typeof idx !== 'number') {
      throw TypeError('child index must be number');
    }
    if (idx >= this.children.length) {
      return null;
    }
    return this.children[idx];
  }
}
