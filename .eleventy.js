module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData("web3formsKey", process.env.WEB3FORMS_KEY || "e6722875-71d5-4d02-bd98-9f36e7568782");

  // Collections optimisées
  eleventyConfig.addCollection("studies", col =>
    col.getFilteredByGlob("content/studies/*.md")
       .sort((a, b) => b.data.year - a.data.year));

  eleventyConfig.addCollection("actions_list", col =>
    col.getFilteredByGlob("content/actions/*.md")
       .filter(i => i.data.type === "action")
       .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)));

  eleventyConfig.addCollection("campagnes", col =>
    col.getFilteredByGlob("content/actions/*.md")
       .filter(i => i.data.type === "campagne")
       .sort((a, b) => new Date(b.data.date) - new Date(a.data.date)));

  eleventyConfig.addCollection("temoignages", col =>
    col.getFilteredByGlob("content/actions/*.md")
       .filter(i => i.data.type === "temoignage"));

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
// Ces lignes cherchent aussi depuis "content/" — à corriger aussi
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "css": "css" });
  eleventyConfig.addPassthroughCopy({ "js": "js" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ ".htaccess": ".htaccess" });
  eleventyConfig.addPassthroughCopy({ "favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "favicon-32x32.png": "favicon-32x32.png" });
  eleventyConfig.addPassthroughCopy({ "favicon-16x16.png": "favicon-16x16.png" });
  eleventyConfig.addPassthroughCopy({ "apple-touch-icon.png": "apple-touch-icon.png" });
  eleventyConfig.addPassthroughCopy({ "site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "data": "data" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ ".htaccess" : ".htaccess" });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
