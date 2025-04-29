const ALeveled = {
  name: 'A',
  children: [
    {
      name: 'A.1',
      children: [
        {
          name: 'A.1.1',
          children: [
            {
              name: 'A.1.1.1',
              children: []
            },
            {
              name: 'A.1.1.2',
              children: []
            }
          ]
        }
      ]
    },
    {
      name: 'A.1',
      children: [
        {
          name: 'A.1.1',
          children: [
            {
              name: 'A.1.1.1',
              children: []
            },
            {
              name: 'A.1.1.2',
              children: []
            }
          ]
        },
        {
          name: 'A.1.1',
          children: [
            {
              name: 'A.1.1.1',
              children: []
            },
            {
              name: 'A.1.1.2',
              children: []
            }
          ]
        }
      ]
    }
  ]
}

const BLeveled = {
  name: 'B',
  children: [
    {
      name: 'B.1',
      children: [
        {
          name: 'B.1.1',
          children: [
            {
              name: 'B.1.1.1',
              children: []
            },
            {
              name: 'B.1.1.2',
              children: []
            }
          ]
        }
      ]
    }
  ]
}

export { ALeveled, BLeveled }
