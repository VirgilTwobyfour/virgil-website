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

  // Collection: posts from 2025
  eleventyConfig.addCollection("posts2025", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/2025/**/*.md") || [];
  });

  // Collection: posts from 2024
  eleventyConfig.addCollection("posts2024", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./posts/2024/**/*.md") || [];
  });

  // Collection: all pages
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./pages/**/*.md") || [];
  });

  // Collection: all unique tags
  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        if (typeof tags === "string") {
          tags = [tags];
        }
        tags.forEach(tag => tagsSet.add(tag));
      }
    });
    return [...tagsSet];
  });

  // Collection: all unique categories
  eleventyConfig.addCollection("categoryList", function(collectionApi) {
    const categoriesSet = new Set();
    collectionApi.getAll().forEach(item => {
      if ("categories" in item.data) {
        let cats = item.data.categories;
        if (typeof cats === "string") {
          cats = [cats];
        }
        cats.forEach(cat => categoriesSet.add(cat));
      }
    });
    return [...categoriesSet];
  });

  // Collection: posts grouped by tag
  eleventyConfig.addCollection("postsByTag", function(collectionApi) {
    let tagMap = {};
    collectionApi.getFilteredByGlob("./posts/**/*.md").forEach(post => {
      if (!post.data.tags) return;
      let tags = Array.isArray(post.data.tags) ? post.data.tags : [post.data.tags];
      tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(post);
      });
    });
    return tagMap;  // object: { tagName: [posts], ... }
  });

  // Collection: posts grouped by category
  eleventyConfig.addCollection("postsByCategory", function(collectionApi) {
    let catMap = {};
    collectionApi.getFilteredByGlob("./posts/**/*.md").forEach(post => {
      if (!post.data.categories) return;
      let cats = Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories];
      cats.forEach(cat => {
        if (!catMap[cat]) catMap[cat] = [];
        catMap[cat].push(post);
      });
    });
    return catMap;  // object: { categoryName: [posts], ... }
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
