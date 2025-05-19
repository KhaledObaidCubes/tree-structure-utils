import type { ITreeNode } from './models/interfaces/I-TreeNode'
import type { ITreeManager } from './models/interfaces/I-TreeManager'

import type { TNode, TJson, TTreeJson, TCheckedTree } from './models/interfaces/i-types'
export type { TNode, TJson, TTreeJson, TCheckedTree, ITreeManager, ITreeNode }

import { TreeManager } from './models/classes/TreeManager'
import { TreeManagerWithCheckBox } from './models/classes/TreeManagerWithCheckBox'

export { TreeManager, TreeManagerWithCheckBox }
