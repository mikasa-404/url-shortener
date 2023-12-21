const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 8 });
const URL = require("../models/url");

async function handleGenerateShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortid = uid.rnd();
  await URL.create({
    shortId: shortid,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortid });
}

async function handleRedirect(req, res) {
  const shortid = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shortId: shortid },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  const url =
    entry.redirectURL.startsWith("http://") ||
    entry.redirectURL.startsWith("https://")
      ? entry.redirectURL
      : `https://${entry.redirectURL}`;
  res.redirect(url);
}

async function handleActivity(req, res) {
  const id = req.params.id;
  const entry = await URL.findOne({ shortId: id });
  return res.json({
    totalClicks: entry.visitHistory.length,
    analytics: entry.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleRedirect,
  handleActivity,
};
