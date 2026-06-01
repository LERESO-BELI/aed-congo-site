module.exports = function(eleventyConfig) {
  // Ignorer les fichiers de documentation ou temporaires qui causent des erreurs Nunjucks
  eleventyConfig.ignores.add("rapport-audit-aed-congo.md");
  eleventyConfig.ignores.add("rapport-deploiement-aed-congo.md");
  eleventyConfig.ignores.add("Diagnostic de votre situation actuelle.md");
  eleventyConfig.ignores.add("rapport-qa-final-ead-website.md");
  eleventyConfig.ignores.add("reste a faire .md");
  eleventyConfig.ignores.add("Voici la balise Google pour ce comp.md");
  eleventyConfig.ignores.add("BELI@*");
  eleventyConfig.ignores.add("d_origine");
  eleventyConfig.ignores.add("temp_reste");
  eleventyConfig.ignores.add("SITE");
  eleventyConfig.ignores.add("PROMPT");
  eleventyConfig.ignores.add("Documents");
  eleventyConfig.ignores.add("FILE2");
  eleventyConfig.ignores.add("files");
  eleventyConfig.ignores.add("_backup");
  eleventyConfig.ignores.add("etudes/*.html");
  eleventyConfig.ignores.add("CLAUDE.md");

  // Copie des dossiers et fichiers statiques
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("data");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy(".htaccess");
  eleventyConfig.addPassthroughCopy("contact.php");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
