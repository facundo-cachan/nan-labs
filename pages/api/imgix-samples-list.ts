// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const data = [
  {
    url: "https://assets.imgix.net/unsplash/alarmclock.jpg",
    name: "alarmclock.jpg"
  },
  {
    url: "https://assets.imgix.net/unsplash/bear.jpg",
    name: "bear.jpg"
  },
  {
    url: "https://assets.imgix.net/unsplash/bridge.jpg",
    name: "bridge.jpg"
  },
  {
    url: "https://assets.imgix.net/unsplash/citystreet.jpg",
    name: "citystreet.jpg"
  },
  {
    url: "https://assets.imgix.net/unsplash/coffee.JPG",
    name: "coffee.JPG"
  },
  {
    url: "https://assets.imgix.net/unsplash/coyote.jpg",
    name: "coyote.jpg"
  },
]

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(data)
}
