/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 3:31 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 3:31 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XTree from './XTree';

export function typeOf(obj: any): string {
  return Object.prototype.toString.call(obj).slice(8, -1);
}

export type visitorFn = (node: XTree) => boolean | void;
/**
 * Depth-First pre-order Traverse
 *
 * @export
 * @param {XTree} root
 * @param {(node: XTree) => boolean} visitor
 */
export function XTreeDFTraverse<T>(root: XTree<T>, visitor: visitorFn): void {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop() as XTree;
    const stop = visitor(node);
    if (!stop && node.hasChildren()) {
      node.forEach((child) => {
        stack.push(child);
      });
    }
  }
}

/**
 * Breadth-First pre-order Traverse
 *
 * @export
 * @param {XTree} root
 * @param {(node: XTree) => boolean} visitor
 * @returns {void}
 */
export function XTreeBFTraverse<T>(root: XTree<T>, visitor: visitorFn): void {
  if (!root) return;
  const queue = [root];
  while (queue.length) {
    const node = queue.shift() as XTree;
    const stop = visitor(node);
    if (!stop && node.hasChildren()) {
      node.forEach(child => queue.push(child));
    }
  }
}

export function XTreeDFPostOrderTraverse<T>(node: XTree<T>, visitor: visitorFn): void {
  node.forEach(child => visitor(child));
  visitor(node);
}


export function Memo(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
  if (typeof descriptor.get === 'function') {
    const sym = Symbol.for(propertyKey);
    const originalGetter = descriptor.get;
    descriptor.get = function propGetter(): ReturnType<typeof originalGetter> {
      // @ts-ignore
      if (typeOf(this[sym]) === 'Undefined') {
        // @ts-ignore
        this[sym] = originalGetter.call(this);
      }
      // @ts-ignore
      return this[sym];
    };
  }
}
