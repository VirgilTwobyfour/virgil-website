module.exports = function(eleventyConfig) {
  // Copy the admin folder to the output
  eleventyConfig.addPassthroughCopy('admin');
};
