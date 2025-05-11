const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cloudinary = require('../utils/cloudinary');

async function extractMetaData(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const title = await page.title();
  const description = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');

  await browser.close();
  return { title, description };
}

async function uploadToCloudinary(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'inspirations',
  });
  fs.unlinkSync(filePath); 
  return result.secure_url;
}



async function captureScreenshots(url) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const screenshotDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2' });

  const desktopPath = path.join(screenshotDir, `desktop-${Date.now()}.png`);
  await page.screenshot({ path: desktopPath, fullPage: true });

  await page.setViewport({ width: 375, height: 812 });
  const mobilePath = path.join(screenshotDir, `mobile-${Date.now()}.png`);
  await page.screenshot({ path: mobilePath, fullPage: true });

  await browser.close();

  // upload both
  const desktopScreenshotUrl = await uploadToCloudinary(desktopPath);
  const mobileScreenshotUrl = await uploadToCloudinary(mobilePath);

  return { desktopScreenshotUrl, mobileScreenshotUrl };
}

module.exports = { extractMetaData, captureScreenshots };
