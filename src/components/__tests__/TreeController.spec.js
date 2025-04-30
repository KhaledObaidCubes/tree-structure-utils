import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
import { TreeNode } from '../../models/classes/TreeNode';

const testObject= new TreeNode()
describe('treeNodeTest',()=>{
    it('render well',()=>{
        const wrapper=mount(testObject.vitestStart(5,8)).toContain(300)
    })
})