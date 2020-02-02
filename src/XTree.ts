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
import { typeOf } from './utils';

const tMDSym = Symbol('tMD');
const nMDSym = Symbol('nMD');

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
  label: string;
  type: NodeType.ELEMENT;
}

interface ITextParam<T> extends IBaseParam<T> {
  type: NodeType.TEXT;
  value: string;
}

// FIXME: there T should keep the same with XTree<T>
export type IXTreeConstructorParam<T = any> = INodeParam<T> | ITextParam<T>;

export default class XTree<T = any> {
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
  public value = '';

  /**
   * child index
   *
   * @type {number}
   * @memberof XTree
   */
  public index: number;

  private [nMDSym]: string;
  /**
   * node message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get nMD(): string {
    if (!this[nMDSym]) {
      this[nMDSym] = md4(this.label + this.value);
    }
    return this[nMDSym];
  }

  private [tMDSym]: string;
  /**
   * tree message digest
   *
   * @readonly
   * @type {string}
   * @memberof XTree
   */
  public get tMD(): string {
    if (!this[tMDSym]) {
      let tMD = this.nMD;
      this.children.forEach((child) => {
        tMD += child.tMD;
      });
      this[tMDSym] = md4(tMD);
    }
    return this[tMDSym];
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
      this.label = param.label;
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
        throw TypeError(`child must be XTree, not ${typeOf(child)}`);
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
