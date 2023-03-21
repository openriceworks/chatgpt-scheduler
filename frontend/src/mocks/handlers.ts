import {rest} from 'msw'

export const handlers = [
  rest.get('/version', (req, res,ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        version: 'mock'
      })
    )
  }),
  rest.post('/api/ask', (req,res,ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        answer: [
          "2022-02-02",
          "2022-02-03",
          "2022-02-05",
          "2022-02-07",
          "2022-02-11",
          "2022-02-13",
          "2022-02-17",
          "2022-02-19",
          "2022-02-23",
          "2022-02-29"
        ]
      })
    )
  })
]