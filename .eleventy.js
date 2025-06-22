module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");

  return {
    dir: {
      input: ".",       // Only build from current folder
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    // Ignore files outside your project folder:
    // By default, Eleventy only builds from your input directory
  };
};
