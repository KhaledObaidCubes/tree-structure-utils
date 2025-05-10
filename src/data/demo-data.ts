import type { TNode } from '../models/interfaces/i-types'

const treeAlpha: TNode = {
  name: 'ob treeI root',
  id: '0',
  children: [
    {
      name: '1',
      id: '0',
      children: [
        {
          name: 'ob 1.1',
          id: '0',
          children: [
            {
              name: '1.1.1',
              id: '0',
              children: [
                {
                  name: '1.1.1.1',
                  id: '0',
                  children: []
                }
              ]
            }
          ]
        },
        {
          name: 'ob 1.2',
          id: '0',
          children: []
        },
        {
          name: 'ob 1.3',
          id: '0',
          children: []
        }
      ]
    },
    {
      name: 'ob 2',
      id: '0',
      children: []
    },
    {
      name: 'ob 3',
      id: '0',
      children: [
        {
          name: 'ob 3.1',
          id: '0',
          children: []
        }
      ]
    }
  ]
}

const treeBeta = {
  name: 'ob B',
  id: '0',
  children: [
    {
      name: 'ob B.1',
      id: '0',
      children: [
        {
          name: 'ob B.1.1',
          id: '0',
          children: [
            {
              name: 'ob B.1.1.1',
              id: '0',
              children: [
                {
                  name: 'ob B.1.1.1.1',
                  id: '0',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

const treeGamma: TNode = {
  name: 'ob treeI root',
  id: '0',
  children: [
    {
      name: 'child1',
      id: '',
      children: [
        { name: 'child11', id: '', children: [] },
        { name: 'child12', id: '', children: [] }
      ]
    },
    {
      name: 'child1',
      id: '',
      children: [
        { name: 'child21', id: '', children: [] },
        { name: 'child22', id: '', children: [] }
      ]
    }
  ]
}
export { treeAlpha, treeBeta, treeGamma }
