import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'hwjft1k5',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'sky5CPBdnv5cddA6MisTUNDo0jy3zg7IKcsr9TPA3WqcBzBnl66LnrPv3poLF4d0Fb0o2z8BNcc6vvwCBYidBrQqMNR3JySzEzj1xKfHQuBphDsLo1EVBRwVUDx3FiWikofOf9sJ2GS6u95WoAcwLASQn0DTaXP7BY48nWaR5ZJTBOTQ2XdI',
  useCdn: false,
})
