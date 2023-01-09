import type { NextApiRequest, NextApiResponse } from 'next'

const data = {
  Adjustment: [{
    id: 'bri',
    name: 'Brightness',
    type: 'range',
  },
  {
    id: 'con',
    name: 'Contrast',
    type: 'range',
  },
  {
    id: 'exp',
    name: 'Exposure',
    type: 'range',
  },
  {
    id: 'gam',
    name: 'Gamma',
    type: 'range',
  },
  {
    id: 'high',
    name: 'Highlight',
    type: 'range',
  },
  {
    id: 'hue',
    name: 'Hue Shift',
    type: 'range',
  },
  {
    id: 'invert',
    name: 'Invert',
    type: 'range',
  },
  {
    id: 'sat',
    name: 'Saturation',
    type: 'range',
  },
  {
    id: 'shad',
    name: 'Shadow',
    type: 'range',
  },
  {
    id: 'sharp',
    name: 'Sharpen',
    type: 'range',
  },
  {
    id: 'usm',
    name: 'Unsharp Mask',
    type: 'range',
  },
  {
    id: 'usmrad',
    name: 'Unsharp Mask Radius',
    type: 'range',
  },
  {
    id: 'vib',
    name: 'Vibrance',
    type: 'range',
  },
  ],
  Rotation: [
    {
      id: 'flip',
      name: 'Flip Axis',
      options: [
        {
          id: 'h',
          name: 'Heigth',
        },
        {
          id: 'w',
          name: 'Width',
        },
        {
          id: 'hv',
          name: 'Along both axes',
        },
      ],
    },
    {
      id: 'orient',
      name: 'Orientation',
      type: [
        {
          id: 90,
          name: '90º',
        },
        {
          id: 180,
          name: '180º',
        },
        {
          id: 360,
          name: '360º',
        },
      ],
    },
    {
      id: 'rot',
      name: 'Rotation',
      type: 'range'
    },
  ]
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(data)
}
