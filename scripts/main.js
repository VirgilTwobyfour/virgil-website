
// Load welcome messages
fetch('welcome_messages.json')
  .then(response => response.json())
  .then(messages => {
    const box = document.getElementById('welcome-box');
    if (box) {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      box.textContent = msg || "Welcome to the Potting Shed (offline mode).";
    }
  });

// Load footer message
fetch('footer_messages.json')
  .then(response => response.json())
  .then(messages => {
    const box = document.getElementById('footer-box');
    if (box) {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      box.textContent = msg || "Welcome to the Potting Shed (offline mode).";
    }
  });

// Like button toggle
function toggleLike(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '♥ Liked' : '♡ Like';
}

// Share button copy
function sharePost(url) {
  if (navigator.share) {
    navigator.share({ title: 'Virgil’s Post', url });
  } else {
    navigator.clipboard.writeText(window.location.origin + '/' + url);
    alert('Link copied to clipboard!');
  }
}

// Show comment form
function toggleCommentForm(id) {
  const form = document.getElementById('comment-form-' + id);
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

// Keith's thank you message
function randomKeithMessage() {
  const messages = [
    "Ta muchly, you're a diamond.",
    "Cheers, I'll let Virgil know between biscuits.",
    "Noted and possibly understood.",
    "Thanks! The goose will be informed.",
    "That’s gone straight in the compost log."
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

// Hook to Formspree-style form
function handleSubmit(form, postTitle) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    alert(randomKeithMessage()); // Simulate Keith's message
    form.reset();
  });
}
