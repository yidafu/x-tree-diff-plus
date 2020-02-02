/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 10:07 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */
import XMLXTreeDiff, { ROOT_LABEL } from "./XMLXTreeDiff";
import EditOption from "./EditOption";

const xmlStr = `<Meta>
  <Author>yidafu(dov yih)</Author>
  <Title>x-tree-diff</Title>
</Meta>`;

const xmlStr2 =  `<Meta>
<Author>yidafu(dov yih)</Author>
<Name>x-tree-diff</Name>
</Meta>`;

const xmlStr3 =  `<Meta>
<Wapper>
  <Author>yidafu(dov yih)</Author>
  <Name>x-tree-diff</Name>
</Wapper>
<Wapper>
  <Author>yidafu(dov yih)</Author>
  <Name>x-tree-diff</Name>
</Wapper>
</Meta>`;

describe("XMLXTreeDiff", () => {
  test('parse xml', () => {
    const xmlDiff = new XMLXTreeDiff(xmlStr, xmlStr);
    const xTree = xmlDiff.buildXTree(xmlStr);
    expect(xTree.label).toBe(ROOT_LABEL);
    expect(xTree.getChild(0)?.getChild(0)?.getChild(0)?.value).toBe('yidafu(dov yih)');
  });

  test('parse xml 2', () => {
    const xmlDiff = new XMLXTreeDiff(xmlStr3, xmlStr3);
    const xTree = xmlDiff.buildXTree(xmlStr3);
    expect(xTree.label).toBe(ROOT_LABEL);
    expect(xTree.getChild(0)?.getChild(1)?.getChild(1)?.getChild(0)?.value).toBe('x-tree-diff');
  });

  test('diff', () => {
    const xmlDiff = new XMLXTreeDiff(xmlStr, xmlStr2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree).toBe(`<Meta op="${EditOption.NOP}"><Author op="${EditOption.NOP}">yidafu(dov yih)</Author><Title op="${EditOption.DEL}">x-tree-diff</Title></Meta>`)
    expect(newTree).toBe(`<Meta op="${EditOption.NOP}"><Author op="${EditOption.NOP}">yidafu(dov yih)</Author><Name op="${EditOption.INS}">x-tree-diff</Name></Meta>`)
  });
});