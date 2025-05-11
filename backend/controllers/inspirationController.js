
const prisma = require('../utils/prismaClient');
const { extractMetaData, captureScreenshots } = require('../services/puppeteerService');
const slugify = require('slugify');

async function extractLinksFromUrl(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const links = await extractLinks(url);
    res.json({ links });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract links' });
  }
}

async function addInspiration(req, res) {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ error: 'URLs array is required' });
  }

  try {
    const results = [];

    for (let url of urls) {
      const metadata = await extractMetaData(url);
      const slug = slugify(metadata.title, { lower: true });

      const screenshots = await captureScreenshots(url);

      const inspiration = await prisma.inspiration.create({
        data: {
          title: metadata.title,
          description: metadata.description,
          websiteLink: url,
          slug,
          metaTitle: metadata.title,
          metaDescription: metadata.description,
          categories: ['Landing Page'],
          fonts: ['Arial'],
          technologyStack: ['HTML', 'CSS'],
          niche: 'General',
          colorScheme: ['#ffffff', '#000000'],
          ...screenshots,
        },
      });

      results.push(inspiration);
    }

    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add inspirations' });
  }
}

async function getAllInspirations(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const inspirations = await prisma.inspiration.findMany({
      skip: (page - 1) * limit,
      take: parseInt(limit),
    });
    res.json(inspirations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inspirations' });
  }
}

async function getSingleInspiration(req, res) {
  const { slug } = req.params;

  try {
    const inspiration = await prisma.inspiration.findUnique({
      where: { slug },
    });

    if (!inspiration) return res.status(404).json({ error: 'Inspiration not found' });

    await prisma.inspiration.update({
      where: { slug },
      data: { pageViews: inspiration.pageViews + 1 },
    });

    res.json(inspiration);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch inspiration' });
  }
}

module.exports = { extractLinksFromUrl, addInspiration, getAllInspirations, getSingleInspiration };
