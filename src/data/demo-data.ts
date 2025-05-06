import type { TNode } from '../models/interfaces/i-types'

const ALeveled: TNode = {
  name: 'ob treeI root',
  id: '0',
  children: [
    {
      name: 'ob 1',
      id: '0',
      children: [
        {
          name: 'ob 1.1',
          id: '0',
          children: [
            {
              name: 'ob 1.1.1',
              id: '0',
              children: [
                {
                  name: 'ob 1.1.1.1',
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

const BLeveled = {
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

export { ALeveled, BLeveled }
