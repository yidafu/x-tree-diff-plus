[XTree Diff+](../README.md) › [Globals](../globals.md) › [XTree](xtree.md)

# Class: XTree <**T**>

## Type parameters

▪ **T**

## Hierarchy

* **XTree**

## Index

### Constructors

* [constructor](xtree.md#constructor)

### Properties

* [Op](xtree.md#op)
* [children](xtree.md#private-children)
* [data](xtree.md#optional-data)
* [id](xtree.md#optional-id)
* [index](xtree.md#index)
* [label](xtree.md#label)
* [nPtr](xtree.md#nptr)
* [pPtr](xtree.md#pptr)
* [type](xtree.md#type)
* [value](xtree.md#value)

### Accessors

* [consistency](xtree.md#consistency)
* [iMD](xtree.md#imd)
* [lLabel](xtree.md#llabel)
* [nId](xtree.md#nid)
* [nMD](xtree.md#nmd)
* [negativeMatch](xtree.md#negativematch)
* [positiveMatch](xtree.md#positivematch)
* [tMD](xtree.md#tmd)

### Methods

* [alernativeMetches](xtree.md#alernativemetches)
* [append](xtree.md#append)
* [forEach](xtree.md#foreach)
* [getChild](xtree.md#getchild)
* [hasChildren](xtree.md#haschildren)

## Constructors

### <a id="constructor" name="constructor"></a>  constructor

\+ **new XTree**(`param`: [IXTreeConstructorParam](../globals.md#ixtreeconstructorparam)): *[XTree](xtree.md)*

*Defined in [XTree.ts:271](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L271)*

**Parameters:**

Name | Type |
------ | ------ |
`param` | [IXTreeConstructorParam](../globals.md#ixtreeconstructorparam) |

**Returns:** *[XTree](xtree.md)*

## Properties

### <a id="op" name="op"></a>  Op

• **Op**: *[EditOption](../enums/editoption.md) | null* = null

*Defined in [XTree.ts:138](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L138)*

edit option

**`memberof`** XTree

___

### <a id="private-children" name="private-children"></a> `Private` children

• **children**: *[XTree](xtree.md)‹T›[]* = []

*Defined in [XTree.ts:254](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L254)*

children list container

**`memberof`** XTree

___

### <a id="optional-data" name="optional-data"></a> `Optional` data

• **data**? : *T*

*Defined in [XTree.ts:271](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L271)*

extensible property.
you can save original node to this property

**`memberof`** XTree

___

### <a id="optional-id" name="optional-id"></a> `Optional` id

• **id**? : *undefined | string*

*Defined in [XTree.ts:47](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L47)*

___

### <a id="index" name="index"></a>  index

• **index**: *number*

*Defined in [XTree.ts:79](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L79)*

child index

**`memberof`** XTree

___

### <a id="label" name="label"></a>  label

• **label**: *string* = ""

*Defined in [XTree.ts:55](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L55)*

node tag name

**`memberof`** XTree

___

### <a id="nptr" name="nptr"></a>  nPtr

• **nPtr**: *[XTree](xtree.md)‹T› | null* = null

*Defined in [XTree.ts:130](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L130)*

node pointer to anther XTree

**`memberof`** XTree

___

### <a id="pptr" name="pptr"></a>  pPtr

• **pPtr**: *[XTree](xtree.md)‹T› | null* = null

*Defined in [XTree.ts:262](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L262)*

pointer to parent XTree

**`memberof`** XTree

___

### <a id="type" name="type"></a>  type

• **type**: *[NodeType](../enums/nodetype.md)*

*Defined in [XTree.ts:63](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L63)*

node type element or text

**`memberof`** XTree

___

### <a id="value" name="value"></a>  value

• **value**: *string | null* = null

*Defined in [XTree.ts:71](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L71)*

text value

**`memberof`** XTree

## Accessors

### <a id="consistency" name="consistency"></a>  consistency

• **get consistency**(): *number*

*Defined in [XTree.ts:209](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L209)*

**`readonly`** 

**`memberof`** XTree

**Returns:** *number*

___

### <a id="imd" name="imd"></a>  iMD

• **get iMD**(): *string | undefined*

*Defined in [XTree.ts:117](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L117)*

uniquely identify each node

**`readonly`** 

**`memberof`** XTree

**Returns:** *string | undefined*

___

### <a id="llabel" name="llabel"></a>  lLabel

• **get lLabel**(): *string*

*Defined in [XTree.ts:148](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L148)*

index label

**`readonly`** 

**`memberof`** XTree

**Returns:** *string*

___

### <a id="nid" name="nid"></a>  nId

• **get nId**(): *string*

*Defined in [XTree.ts:159](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L159)*

node indentifer

**`readonly`** 

**`memberof`** XTree

**Returns:** *string*

___

### <a id="nmd" name="nmd"></a>  nMD

• **get nMD**(): *string*

*Defined in [XTree.ts:89](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L89)*

node message digest

**`readonly`** 

**`memberof`** XTree

**Returns:** *string*

___

### <a id="negativematch" name="negativematch"></a>  negativeMatch

• **get negativeMatch**(): *number*

*Defined in [XTree.ts:192](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L192)*

**`readonly`** 

**`memberof`** XTree

**Returns:** *number*

___

### <a id="positivematch" name="positivematch"></a>  positiveMatch

• **get positiveMatch**(): *number*

*Defined in [XTree.ts:174](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L174)*

**`readonly`** 

**`memberof`** XTree

**Returns:** *number*

___

### <a id="tmd" name="tmd"></a>  tMD

• **get tMD**(): *string*

*Defined in [XTree.ts:101](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L101)*

tree message digest

**`readonly`** 

**`memberof`** XTree

**Returns:** *string*

## Methods

### <a id="alernativemetches" name="alernativemetches"></a>  alernativeMetches

▸ **alernativeMetches**(): *object*

*Defined in [XTree.ts:219](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L219)*

**Returns:** *object*

* **supportingDegree**: *number*

* **supportingDegreeNode**: *[XTree](xtree.md)‹T› | null*

___

### <a id="append" name="append"></a>  append

▸ **append**(`children`: [XTree](xtree.md)‹T› | [XTree](xtree.md)‹T›[]): *void*

*Defined in [XTree.ts:289](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L289)*

**Parameters:**

Name | Type |
------ | ------ |
`children` | [XTree](xtree.md)‹T› &#124; [XTree](xtree.md)‹T›[] |

**Returns:** *void*

___

### <a id="foreach" name="foreach"></a>  forEach

▸ **forEach**(`callback`: function): *void*

*Defined in [XTree.ts:305](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L305)*

**Parameters:**

▪ **callback**: *function*

▸ (`node`: [XTree](xtree.md)‹T›, `index`: number, `thisArg`: [XTree](xtree.md)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`node` | [XTree](xtree.md)‹T› |
`index` | number |
`thisArg` | [XTree](xtree.md)‹T› |

**Returns:** *void*

___

### <a id="getchild" name="getchild"></a>  getChild

▸ **getChild**(`idx`: number): *[XTree](xtree.md)‹T› | null*

*Defined in [XTree.ts:315](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L315)*

**Parameters:**

Name | Type |
------ | ------ |
`idx` | number |

**Returns:** *[XTree](xtree.md)‹T› | null*

___

### <a id="haschildren" name="haschildren"></a>  hasChildren

▸ **hasChildren**(): *boolean*

*Defined in [XTree.ts:311](https://github.com/yidafu/x-tree-diff-plus/blob/5f3adda/src/XTree.ts#L311)*

**Returns:** *boolean*
