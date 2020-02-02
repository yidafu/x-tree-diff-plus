/**
 * @jest-environment jsdom
 */

/* --------------------------------------------------------------------------*
 * Description:                                                              *
 *                                                                           *
 * File Created: Saturday, 28th December 2019 5:21 pm                        *
 * Author: yidafu(dov-yih) (me@yidafu.dev)                                   *
 *                                                                           *
 * Last Modified: Saturday, 28th December 2019 11:43 pm                      *
 * Modified By: yidafu(dov-yih) (me@yidafu.dev>)                             *
 *                                                                           *
 * Copyright 2019 - 2019 Mozilla Public License 2.0                          *
 *-------------------------------------------------------------------------- */

import HTMLXTreeDiff from "./HTMLXTreeDiff";
import EditOption from "./EditOption";

const html1 = `<div>
  <p>yidafu(dov yih)</p>
  <span>x-tree-diff</span>
</div>`;

const html2 =  `<div>
  <p>yidafu(dov yih)</p>
  <code>x-tree-diff</code>
  <p>yidafu(dov yih)</p>
</div>`;

const html3 =  `<div>
  <section>
    <p>yidafu(dov yih)</p>
    <code>x-tree-diff</code>
    <p>yidafu(dov yih)</p>
  </section>
</div>`;

const html4 =  `<div>
  <section>
    <section>
      <p>yidafu(dov yih)</p>
      <code>x-tree-diff</code>
      <p>yidafu(dov yih)</p>
    </section>
  </section>
</div>`;

const html5 =  `<div>
  <section>
    <section>
      <section>
        <p>yidafu(dov yih)</p>
        <code>x-tree-diff</code>
        <p>yidafu(dov yih)</p>
      </section>
    </section>
  </section>
</div>`;

const html6 = `<div>
  <span>x-tree-diff</span>
  <p>yidafu(dov yih)</p>
</div>`;

describe("HTMLXTreeDiff", () => {
  test('a change node', () => {
    document.body.innerHTML = `
      <div id="div1">${html1}</div>
      <div id="div2">${html2}</div>
    `;
    
    const $div1 = document.getElementById('div1') as HTMLElement;
    const $div2 = document.getElementById('div2') as HTMLElement;

    const xmlDiff = new HTMLXTreeDiff($div1, $div2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  <span op="${EditOption.DEL}">x-tree-diff</span>
</div>`);
    expect(newTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  <code op="${EditOption.INS}">x-tree-diff</code>
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
</div>`);
  });

  test('one layer nesting', () => {
    document.body.innerHTML = `
      <div id="div1">${html3}</div>
      <div id="div2">${html4}</div>
    `;
    
    const $div1 = document.getElementById('div1') as HTMLElement;
    const $div2 = document.getElementById('div2') as HTMLElement;

    const xmlDiff = new HTMLXTreeDiff($div1, $div2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <section op="${EditOption.NOP}">
    <p op="${EditOption.NOP}">yidafu(dov yih)</p>
    <code op="${EditOption.MOV}">x-tree-diff</code>
    <p op="${EditOption.DEL}">yidafu(dov yih)</p>
  </section>
</div>`);
    expect(newTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <section op="${EditOption.INS}">
    <section op="${EditOption.NOP}">
      <p op="${EditOption.NOP}">yidafu(dov yih)</p>
      <code op="${EditOption.MOV}">x-tree-diff</code>
      <p op="${EditOption.NOP}">yidafu(dov yih)</p>
    </section>
  </section>
</div>`);
  });

  test('two layer nesting', () => {
    document.body.innerHTML = `
      <div id="div1">${html5}</div>
      <div id="div2">${html3}</div>
    `;
    
    const $div1 = document.getElementById('div1') as HTMLElement;
    const $div2 = document.getElementById('div2') as HTMLElement;

    const xmlDiff = new HTMLXTreeDiff($div1, $div2);
    const { oldTree, newTree } = xmlDiff.diff();

    expect(oldTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <section op="${EditOption.DEL}">
    <section op="${EditOption.DEL}">
      <section op="${EditOption.NOP}">
        <p op="${EditOption.NOP}">yidafu(dov yih)</p>
        <code op="${EditOption.MOV}">x-tree-diff</code>
        <p op="${EditOption.DEL}">yidafu(dov yih)</p>
      </section>
    </section>
  </section>
</div>`);

    expect(newTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <section op="${EditOption.NOP}">
    <p op="${EditOption.NOP}">yidafu(dov yih)</p>
    <code op="${EditOption.MOV}">x-tree-diff</code>
    <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  </section>
</div>`);
  });

  test('children out of order', () => {
    document.body.innerHTML = `
      <div id="div1">${html1}</div>
      <div id="div2">${html6}</div>
    `;
    
    const $div1 = document.getElementById('div1') as HTMLElement;
    const $div2 = document.getElementById('div2') as HTMLElement;

    const xmlDiff = new HTMLXTreeDiff($div1, $div2);
    const { oldTree, newTree } = xmlDiff.diff();
    expect(oldTree.innerHTML).toBe(
`<div op="${EditOption.NOP}">
  <p op="${EditOption.NOP}">yidafu(dov yih)</p>
  <span op="${EditOption.NOP}">x-tree-diff</span>
</div>`);
expect(oldTree.innerHTML).toBe(
  `<div op="${EditOption.NOP}">
    <p op="${EditOption.NOP}">yidafu(dov yih)</p>
    <span op="${EditOption.MOV}">x-tree-diff</span>
  </div>`);
  });
});