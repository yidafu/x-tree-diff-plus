[XTree Diff+](../README.md) › [Globals](../globals.md) › [XTreeDiffPlus](xtreediffplus.md)

# Class: XTreeDiffPlus <**T, S**>

X-Tree Diff+ plus implement.

**`export`** 

**`abstract`** 

## Type parameters

▪ **T**

old & new tree type

▪ **S**

XTree data proprety type

## Hierarchy

* **XTreeDiffPlus**

## Index

### Constructors

* [constructor](xtreediffplus.md#constructor)

### Properties

* [M_List](xtreediffplus.md#private-m_list)
* [N_Htable](xtreediffplus.md#private-n_htable)
* [N_IDHtable](xtreediffplus.md#private-n_idhtable)
* [O_Htable](xtreediffplus.md#private-o_htable)
* [rawMew](xtreediffplus.md#protected-rawmew)
* [rawOld](xtreediffplus.md#protected-rawold)

### Methods

* [buildXTree](xtreediffplus.md#abstract-buildxtree)
* [diff](xtreediffplus.md#diff)
* [dumpXTree](xtreediffplus.md#abstract-dumpxtree)
* [initHtable](xtreediffplus.md#private-inithtable)
* [matchNodeSubtreeWith](xtreediffplus.md#private-matchnodesubtreewith)
* [matchNodesWith](xtreediffplus.md#private-matchnodeswith)
* [matchUpward](xtreediffplus.md#private-matchupward)

## Constructors

### <a id="constructor" name="constructor"></a>  constructor

\+ **new XTreeDiffPlus**(`T_old`: T, `T_new`: T): *[XTreeDiffPlus](xtreediffplus.md)*

*Defined in [XTreeDiffPlus.ts:53](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L53)*

**Parameters:**

Name | Type |
------ | ------ |
`T_old` | T |
`T_new` | T |

**Returns:** *[XTreeDiffPlus](xtreediffplus.md)*

## Properties

### <a id="private-m_list" name="private-m_list"></a> `Private` M_List

• **M_List**: *Map‹[XTree](xtree.md)‹S›, [XTree](xtree.md)‹S››* = new Map<XTree<S>, XTree<S>>()

*Defined in [XTreeDiffPlus.ts:45](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L45)*

___

### <a id="private-n_htable" name="private-n_htable"></a> `Private` N_Htable

• **N_Htable**: *Map‹string, [XTree](xtree.md)‹S››* = new Map <string, XTree<S>>()

*Defined in [XTreeDiffPlus.ts:35](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L35)*

___

### <a id="private-n_idhtable" name="private-n_idhtable"></a> `Private` N_IDHtable

• **N_IDHtable**: *Map‹string, [XTree](xtree.md)‹S››* = new Map<string, XTree<S>>()

*Defined in [XTreeDiffPlus.ts:50](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L50)*

___

### <a id="private-o_htable" name="private-o_htable"></a> `Private` O_Htable

• **O_Htable**: *Map‹string, [XTree](xtree.md)‹S›[]›* = new Map <string, XTree<S>[]>()

*Defined in [XTreeDiffPlus.ts:40](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L40)*

___

### <a id="protected-rawmew" name="protected-rawmew"></a> `Protected` rawMew

• **rawMew**: *T*

*Defined in [XTreeDiffPlus.ts:53](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L53)*

___

### <a id="protected-rawold" name="protected-rawold"></a> `Protected` rawOld

• **rawOld**: *T*

*Defined in [XTreeDiffPlus.ts:52](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L52)*

## Methods

### <a id="abstract-buildxtree" name="abstract-buildxtree"></a> `Abstract` buildXTree

▸ **buildXTree**(`rawTree`: T): *[XTree](xtree.md)‹S›*

*Defined in [XTreeDiffPlus.ts:378](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L378)*

buid XFree from source Tree type

**`abstract`** 

**`memberof`** XTreeDiffPlus

**Parameters:**

Name | Type |
------ | ------ |
`rawTree` | T |

**Returns:** *[XTree](xtree.md)‹S›*

___

### <a id="diff" name="diff"></a>  diff

▸ **diff**(): *object*

*Defined in [XTreeDiffPlus.ts:144](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L144)*

run diff algorithm

**`memberof`** XTreeDiffPlus

**Returns:** *object*

* **newTree**: *S*

* **oldTree**: *S*

___

### <a id="abstract-dumpxtree" name="abstract-dumpxtree"></a> `Abstract` dumpXTree

▸ **dumpXTree**(`oldTree`: [XTree](xtree.md)‹S›, `newTree`: [XTree](xtree.md)‹S›): *object*

*Defined in [XTreeDiffPlus.ts:389](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L389)*

dump XTree to target tree type

**`abstract`** 

**`memberof`** XTreeDiffPlus

**Parameters:**

Name | Type |
------ | ------ |
`oldTree` | [XTree](xtree.md)‹S› |
`newTree` | [XTree](xtree.md)‹S› |

**Returns:** *object*

* **newTree**: *any*

* **oldTree**: *any*

___

### <a id="private-inithtable" name="private-inithtable"></a> `Private` initHtable

▸ **initHtable**(`root`: [XTree](xtree.md)‹S›, `callback`: function): *Map‹string, number›*

*Defined in [XTreeDiffPlus.ts:122](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L122)*

**`memberof`** XTreeDiffPlus

**Parameters:**

▪ **root**: *[XTree](xtree.md)‹S›*

▪ **callback**: *function*

tMD_map: tMD 出现的次数

▸ (`node`: [XTree](xtree.md)‹S›, `tMD_map`: Map‹string, number›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [XTree](xtree.md)‹S› |
`tMD_map` | Map‹string, number› |

**Returns:** *Map‹string, number›*

___

### <a id="private-matchnodesubtreewith" name="private-matchnodesubtreewith"></a> `Private` matchNodeSubtreeWith

▸ **matchNodeSubtreeWith**(`node1`: [XTree](xtree.md)‹S›, `node2`: [XTree](xtree.md)‹S›, `op`: [EditOption](../enums/editoption.md)): *void*

*Defined in [XTreeDiffPlus.ts:67](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L67)*

**Parameters:**

Name | Type |
------ | ------ |
`node1` | [XTree](xtree.md)‹S› |
`node2` | [XTree](xtree.md)‹S› |
`op` | [EditOption](../enums/editoption.md) |

**Returns:** *void*

___

### <a id="private-matchnodeswith" name="private-matchnodeswith"></a> `Private` matchNodesWith

▸ **matchNodesWith**(`node1`: [XTree](xtree.md)‹S›, `node2`: [XTree](xtree.md)‹S›, `op`: [EditOption](../enums/editoption.md)): *void*

*Defined in [XTreeDiffPlus.ts:60](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L60)*

**Parameters:**

Name | Type |
------ | ------ |
`node1` | [XTree](xtree.md)‹S› |
`node2` | [XTree](xtree.md)‹S› |
`op` | [EditOption](../enums/editoption.md) |

**Returns:** *void*

___

### <a id="private-matchupward" name="private-matchupward"></a> `Private` matchUpward

▸ **matchUpward**(`matchMap`: Map‹[XTree](xtree.md)‹S›, [XTree](xtree.md)‹S›› | [[XTree](xtree.md)‹S›, [XTree](xtree.md)‹S›][]): *void*

*Defined in [XTreeDiffPlus.ts:90](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTreeDiffPlus.ts#L90)*

propagete matching upward

**`memberof`** XTreeDiffPlus

**Parameters:**

Name | Type |
------ | ------ |
`matchMap` | Map‹[XTree](xtree.md)‹S›, [XTree](xtree.md)‹S›› &#124; [[XTree](xtree.md)‹S›, [XTree](xtree.md)‹S›][] |

**Returns:** *void*
