[XTree Diff+](README.md) › [Globals](globals.md)

# XTree Diff+

## Index

### Enumerations

* [EditOption](enums/editoption.md)
* [NodeType](enums/nodetype.md)

### Classes

* [XTree](classes/xtree.md)
* [XTreeDiffPlus](classes/xtreediffplus.md)

### Interfaces

* [IBaseParam](interfaces/ibaseparam.md)
* [INodeParam](interfaces/inodeparam.md)
* [ITextParam](interfaces/itextparam.md)

### Type aliases

* [IXTreeConstructorParam](globals.md#ixtreeconstructorparam)
* [visitorFn](globals.md#visitorfn)

### Functions

* [Memo](globals.md#memo)
* [XTreeBFTraverse](globals.md#xtreebftraverse)
* [XTreeDFPostOrderTraverse](globals.md#xtreedfpostordertraverse)
* [XTreeDFTraverse](globals.md#xtreedftraverse)
* [md4](globals.md#md4)
* [typeOf](globals.md#typeof)

## Type aliases

### <a id="ixtreeconstructorparam" name="ixtreeconstructorparam"></a>  IXTreeConstructorParam

Ƭ **IXTreeConstructorParam**: *[INodeParam](interfaces/inodeparam.md)‹T› | [ITextParam](interfaces/itextparam.md)‹T›*

*Defined in [XTree.ts:43](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L43)*

___

### <a id="visitorfn" name="visitorfn"></a>  visitorFn

Ƭ **visitorFn**: *function*

*Defined in [utils.ts:18](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L18)*

#### Type declaration:

▸ (`node`: [XTree](classes/xtree.md)): *boolean | void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [XTree](classes/xtree.md) |

## Functions

### <a id="memo" name="memo"></a>  Memo

▸ **Memo**(`target`: any, `propertyKey`: string, `descriptor`: PropertyDescriptor): *void*

*Defined in [utils.ts:66](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`target` | any |
`propertyKey` | string |
`descriptor` | PropertyDescriptor |

**Returns:** *void*

___

### <a id="xtreebftraverse" name="xtreebftraverse"></a>  XTreeBFTraverse

▸ **XTreeBFTraverse**<**T**>(`root`: [XTree](classes/xtree.md)‹T›, `visitor`: [visitorFn](globals.md#visitorfn)): *void*

*Defined in [utils.ts:48](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L48)*

Breadth-First pre-order Traverse

**`export`** 

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`root` | [XTree](classes/xtree.md)‹T› |
`visitor` | [visitorFn](globals.md#visitorfn) |

**Returns:** *void*

___

### <a id="xtreedfpostordertraverse" name="xtreedfpostordertraverse"></a>  XTreeDFPostOrderTraverse

▸ **XTreeDFPostOrderTraverse**<**T**>(`node`: [XTree](classes/xtree.md)‹T›, `visitor`: [visitorFn](globals.md#visitorfn)): *void*

*Defined in [utils.ts:60](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L60)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`node` | [XTree](classes/xtree.md)‹T› |
`visitor` | [visitorFn](globals.md#visitorfn) |

**Returns:** *void*

___

### <a id="xtreedftraverse" name="xtreedftraverse"></a>  XTreeDFTraverse

▸ **XTreeDFTraverse**<**T**>(`root`: [XTree](classes/xtree.md)‹T›, `visitor`: [visitorFn](globals.md#visitorfn)): *void*

*Defined in [utils.ts:26](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L26)*

Depth-First pre-order Traverse

**`export`** 

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`root` | [XTree](classes/xtree.md)‹T› | - |
`visitor` | [visitorFn](globals.md#visitorfn) |   |

**Returns:** *void*

___

### <a id="md4" name="md4"></a>  md4

▸ **md4**(`message`: string): *string*

*Defined in [md4.ts:21](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/md4.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *string*

___

### <a id="typeof" name="typeof"></a>  typeOf

▸ **typeOf**(`obj`: any): *string*

*Defined in [utils.ts:14](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/utils.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | any |

**Returns:** *string*
