module.exports = function(eleventyConfig) {
  // Pass through static assets folders
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  // Collection: featured post(s)
  eleventyConfig.addCollection("featuredPost", function(collectionApi) {
    return (collectionApi.getFilteredByGlob("./posts/**/*.md") || [])
      .filter(post => post.data.featured)
      .sort((a, b) => b.date - a.date)
      .slice(0, 1);
  });

  // Collection: all posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/**/*.md") || [];
  });

  // Filter: safe limit for arrays
  eleventyConfig.addFilter("limit", function(arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  });

  // Filter: truncate string to length with clamp
  eleventyConfig.addFilter("truncate", (str, length = 150, clamp = '…') => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + clamp;
  });

  // Filter: format date in readable UK style
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  });

  // Directory settings
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
