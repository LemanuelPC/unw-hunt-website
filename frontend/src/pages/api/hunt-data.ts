import { NextApiRequest, NextApiResponse } from 'next';
import { mockHuntData, mockServerTiming } from '@/mocks/huntData';
import axios from 'axios';

/*
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get the week parameter from the query string
    const { week } = req.query;

    // Forward the request to your backend service
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hunt-data`, {
      params: { week },
    });

    // Return the data from your backend
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      message: 'An error occurred while fetching hunt data'
    });
  }
}*/

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Simulate a small delay to test loading states
  setTimeout(() => {
    res.status(200).json({
      players: mockHuntData,
      serverTiming: mockServerTiming
    });
  }, 500);
}