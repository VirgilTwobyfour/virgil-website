const slugify = require("slugify");

module.exports = function(eleventyConfig) {
  // Pass through static assets folders
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  // Collection: all posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md") || [];
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
    // Return array of objects with name and slug
    return [...tagsSet].map(tag => ({
      name: tag,
      slug: slugify(tag, { lower: true, strict: true })
    }));
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
    // Return array of objects with name and slug
    return [...categoriesSet].map(cat => ({
      name: cat,
      slug: slugify(cat, { lower: true, strict: true })
    }));
  });

  // Collection: posts grouped by tag
  eleventyConfig.addCollection("postsByTag", function(collectionApi) {
    let tagMap = {};
    collectionApi.getFilteredByGlob("posts/**/*.md").forEach(post => {
      if (!post.data.tags) return;
      let tags = Array.isArray(post.data.tags) ? post.data.tags : [post.data.tags];
      tags.forEach(tag => {
        if (!tagMap[tag]) tagMap[tag] = [];
        tagMap[tag].push(post);
      });
    });
    return tagMap;
  });

  // Collection: posts grouped by category
  eleventyConfig.addCollection("postsByCategory", function(collectionApi) {
    let catMap = {};
    collectionApi.getFilteredByGlob("posts/**/*.md").forEach(post => {
      if (!post.data.categories) return;
      let cats = Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories];
      cats.forEach(cat => {
        if (!catMap[cat]) catMap[cat] = [];
        catMap[cat].push(post);
      });
    });
    return catMap;
  });

  // Filters
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  });

  eleventyConfig.addFilter("limit", function(arr, limit) {
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("truncate", (str, length = 150, clamp = '…') => {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + clamp;
  });

  // Add slug filter for templates
  eleventyConfig.addFilter("slug", function(str) {
    return slugify(str, { lower: true, strict: true });
  });

  // Add missing plus filter to do addition in templates
  eleventyConfig.addFilter("plus", function(value, addition) {
    return Number(value) + Number(addition);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
