/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Thursday, 26th December 2019 9:05 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Thursday, 26th December 2019 9:05 pm                       *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import { createTree31 , createTree32 } from '../test/nested'
import { XTreeDiffPlus }                                                                                                                                             from './XTreeDiffPlus';
import { EditOption }                                                                                                                                                from './EditOption';
import { createTree01, createTree02, createTree03, createTree05, createTree04, createTree06, createTree07, createTree08, createTree09, createTree010, createTree011} from '../test/three-nodes';
import { createOldTree, createNewTree }                                                                                                                              from '../test/tune-existing-matches'
// import createTree1 from '../test/tree1';
// import createTree2 from '../test/tree2';
// imporkkt createTree3 from '../test/tree3';
import { XTree }                                                                                                                                                     from './XTree';
import { createTree11, createTree12 }                                                                                                                                from '../test/duplicate';
import { createTree22, createTree21, createTree23 }                                                                                                                  from '../test/text-ndoe';

class DefaultXTreeDiff extends XTreeDiffPlus<XTree, XTree> {
  public buildXTree(tree: XTree) {
    return tree;
  }
  
  public dumpXTree(oldTree: XTree, newTree: XTree): { oldTree: XTree, newTree: XTree} {
    return { oldTree, newTree };
  }
}

describe('three nodes', () => {
  test('modify the second children node compared with tree1', () => {
    const oldTree = createTree01();
    const newTree = createTree02();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.UPD);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.UPD);
  });

  test('tree5 modify the second children node compared with tree4', () => {
    const oldTree = createTree04();
    const newTree = createTree05();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree?.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(oldTree?.getChild(1)?.Op).toBe(EditOption.UPD);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree?.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(newTree?.getChild(1)?.Op).toBe(EditOption.UPD);
  });

  test('swap the order of children compared with tree2', () => {
    const oldTree = createTree02();
    const newTree = createTree03();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.MOV);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.MOV);
  });

  test('tree 6 has a extra child node compared with tree5', () => {
    const oldTree = createTree05();
    const newTree = createTree06();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.NOP);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(2)?.Op).toBe(EditOption.INS);
  });

  test('tree 7 missing the second child node compared with tree6', () => {
    const oldTree = createTree06();
    const newTree = createTree07();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.DEL);
    expect(oldTree.getChild(2)?.Op).toBe(EditOption.MOV);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.MOV);
  });

  test('tree 8 has completely different children compared with tree7', () => {
    const oldTree = createTree07();
    const newTree = createTree08();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.DEL);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.DEL);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.DEL);
    expect(newTree.Op).toBe(EditOption.INS);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.INS);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.INS);
  });
  
  test('tree 9 this first child different from tree7', () => {
    const oldTree = createTree07();
    const newTree = createTree09();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.MOV);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.MOV);
    expect(newTree.getChild(0)?.getChild(0)?.Op).toBe(EditOption.INS);
  });

  test('tree 10 children not eqaul to tree 5', () => {
    const oldTree = createTree05();
    const newTree = createTree010();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.NOP);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.getChild(0)?.Op).toBe(EditOption.INS);
  });

  test('tree 11 break order with id compared to tree 2', () => {
    const oldTree = createTree02();
    const newTree = createTree011();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(oldTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(oldTree.getChild(1)?.Op).toBe(EditOption.MOV);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(0)?.Op).toBe(EditOption.MOV);
    expect(newTree.getChild(1)?.Op).toBe(EditOption.MOV);
  });
});


describe('standard case', () => {
  test('tune existing matches',() => {
    const oldTree = createOldTree();
    const newTree = createNewTree();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();
    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(newTree.Op).toBe(EditOption.NOP);
    expect(newTree?.getChild(0)?.nPtr).toBe(oldTree?.getChild(1));
    expect(newTree?.getChild(1)?.nPtr).toBe(oldTree?.getChild(0));
  });
});


describe('duplicate node', () => {
  test('twe tree are the same', () => {
    const oldTree = createTree11();
    const newTree = createTree11();
    const xTreeDiff = new DefaultXTreeDiff(oldTree, newTree);
    xTreeDiff.diff();

    expect(oldTree.Op).toBe(EditOption.NOP);
    expect(newTree.Op).toBe(EditOption.NOP);

    expect(newTree.getChild(0)!.getChild(0)!.Op).toBe(EditOption.NOP);
    expect(newTree.getChild(1)!.getChild(1)!.Op).toBe(EditOption.NOP);
  });

  test('the second child of these trees are not the same', () => {
    const oldTree   = createTree11 ()
    const newTree   = createTree12 ()
    const xTreeDiff = new DefaultXTreeDiff (
      oldTree ,
      newTree
    )
    xTreeDiff.diff ()

    expect ( oldTree.Op )
      .toBe ( EditOption.NOP )
    expect ( newTree.Op )
      .toBe ( EditOption.NOP )

    expect ( newTree.getChild ( 0 )!.Op )
      .toBe ( EditOption.NOP )
    expect ( newTree.getChild ( 1 )!.Op )
      .toBe ( EditOption.UPD )
  } );

  describe (
    'text node' ,
    () => {
      test (
        'the secode text are diffirent' ,
        () => {
          const oldTree   = createTree21 ()
          const newTree   = createTree22 ()
          const xTreeDiff = new DefaultXTreeDiff (
            oldTree ,
            newTree
          )
          xTreeDiff.diff ()
          expect ( newTree.getChild ( 1 )!.getChild ( 0 )!.Op )
            .toBe ( EditOption.UPD )
          expect ( oldTree.getChild ( 1 )!.getChild ( 0 )!.Op )
            .toBe ( EditOption.UPD )
        }
      )

      test (
        'oldTree two text node are the same,but newTree not' ,
        () => {
          const oldTree   = createTree23 ()
          const newTree   = createTree21 ()
          const xTreeDiff = new DefaultXTreeDiff (
            oldTree ,
            newTree
          )
          xTreeDiff.diff ()
          expect ( newTree.getChild ( 1 )!.getChild ( 0 )!.Op )
            .toBe ( EditOption.UPD )
          expect ( oldTree.getChild ( 1 )!.getChild ( 0 )!.Op )
            .toBe ( EditOption.UPD )
        }
      )
    }
  )
} );

describe (
  'nested nodes' ,
  () => {
    test (
      'inserting a element node in between of some text nodes' ,
      () => {
        // old Tree:  <div>This is a good test.</div>
        const oldTree = createTree31 ()

        // new Tree:  <div>This is a<b>very good</b>test.</div>
        const newTree = createTree32 ()

        const xTreeDiff = new DefaultXTreeDiff (
          oldTree ,
          newTree
        )


        xTreeDiff.diff ()

        expect ( oldTree.Op )
          .toBe ( EditOption.NOP )
        expect ( newTree.Op )
          .toBe ( EditOption.NOP )

        // This 
        const This = newTree?.getChild ( 0 )
                            ?.getChild ( 0 )
        expect ( This?.nPtr )
          .toBe ( oldTree?.getChild ( 0 )
                         ?.getChild ( 0 ) )

        // is 
        const is = newTree?.getChild ( 0 )
                          ?.getChild ( 1 )
        expect ( is?.nPtr )
          .toBe ( oldTree?.getChild ( 0 )
                         ?.getChild ( 1 ) )

        // a 
        const a = newTree?.getChild ( 0 )
                         ?.getChild ( 2 )
        expect ( a?.nPtr )
          .toBe ( oldTree?.getChild ( 0 )
                         ?.getChild ( 2 ) )

        expect ( newTree?.getChild ( 0 )
                        ?.getChild ( 3 ) )
          .toBeNull ()


        // <b>very good</b> 
        const B = newTree?.getChild ( 1 )
        expect ( B?.label )
          .toBe ( 'B' )

        expect ( B?.getChild ( 0 )?.value )
          .toBe ( 'very' )
        expect ( B?.getChild ( 0 )?.Op )
          .toBe ( EditOption.INS )

        expect ( B?.getChild ( 1 )?.value )
          .toBe ( 'good' )
        expect ( B?.getChild ( 1 )?.Op )
          .toBe ( EditOption.MOV )

        expect ( B?.getChild ( 1 )?.nPtr )
          .toBe ( oldTree?.getChild ( 0 )
                         ?.getChild ( 3 ) )

        // test. 
        const test = newTree?.getChild ( 2 )
                            ?.getChild ( 0 )
        expect ( test?.nPtr )
          .toBe ( oldTree?.getChild ( 0 )
                         ?.getChild ( 4 ) )
      }
    )
  }
)
