// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/db';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log("asdasdsadasdsadasd");
  
//   if (req.method !== 'POST') {
//     return res.status(405).end(); // Method Not Allowed
//   }

//   const { name } = req.body;

//   // Assume user ID is stored in session or cookies
//   const userId = req.cookies.userId;

//   if (!userId || !name) {
//     return res.status(400).json({ error: 'Invalid request' });
//   }

//   try {
//     await prisma.user.update({
//       where: { id: userId },
//       data: { name },
//     });
//     console.log("dasdasdsad");
    
//     res.status(200).end();
//   } catch (error) {
//     console.error('Failed to update profile:', error);
//     res.status(500).json({ error: 'Failed to update profile' });
//   }
// };
