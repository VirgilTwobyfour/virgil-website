
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-posts");
  fetch("posts_index.json")
    .then(response => response.json())
    .then(posts => {
      if (!Array.isArray(posts)) return;
      posts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort newest first
      posts.slice(0, 8).forEach(post => {
        const article = document.createElement("article");
        article.className = "blog-post-preview";

        const thumb = document.createElement("img");
        thumb.src = post.thumbnail;
        thumb.alt = post.title;
        thumb.className = "post-thumbnail";

        const title = document.createElement("h2");
        const link = document.createElement("a");
        link.href = post.url;
        link.innerText = post.title;
        title.appendChild(link);

        const preview = document.createElement("p");
        preview.innerText = post.preview;

        article.appendChild(thumb);
        article.appendChild(title);
        article.appendChild(preview);

        container.appendChild(article);
      });
    })
    .catch(error => {
      console.error("Error loading posts:", error);
      container.innerHTML = "<p>Unable to load posts at this time. Keith may have tripped over the wiring.</p>";
    });
});
