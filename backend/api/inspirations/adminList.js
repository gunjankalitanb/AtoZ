const prisma = require('../../utils/prismaClient');
const authenticate = require('../../utils/authMiddleware');

module.exports = async (req, res) => {
  authenticate(req, res, async () => {
    const data = await prisma.inspiration.findMany();
    res.status(200).json(data);
  });
};
