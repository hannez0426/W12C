
const API_URL = "https://jsonplaceholder.typicode.com";

// Select HTML elements
const postForm = document.getElementById("postForm");
const postTitle = document.getElementById("postTitle");
const postBody = document.getElementById("postBody");
const sendBtn = document.getElementById("sendBtn");

const patchBtn = document.getElementById("patchBtn");
const deleteBtn = document.getElementById("deleteBtn");

const postsContainer = document.getElementById("postsContainer");

// Display success, loading, or error messages
function showMessage(elementId, text, type) {
  const element = document.getElementById(elementId);
  element.innerText = text;
  element.className = "message " + type;
}

// POST REQUEST - Create a new post
postForm.addEventListener("submit", async function(event) {
  event.preventDefault();

  sendBtn.disabled = true;
  showMessage("postMessage", "Sending your post...", "loading");

  try {
    const response = await axios.post(API_URL + "/posts", {
      title: postTitle.value,
      body: postBody.value,
      userId: 1
    });

    console.log("POST response:", response.data);

    showMessage(
      "postMessage",
      "Post created successfully! ID: " + response.data.id,
      "success"
    );

    postForm.reset();

  } catch (error) {
    console.error(error);
    showMessage(
      "postMessage",
      "Failed to create post. Please try again.",
      "error"
    );
  } finally {
    sendBtn.disabled = false;
  }
});

// PATCH REQUEST - Update post #1
patchBtn.addEventListener("click", async function() {
  patchBtn.disabled = true;
  showMessage("patchMessage", "Updating post...", "loading");

  try {
    const response = await axios.patch(API_URL + "/posts/1", {
      title: "Updated Post Using Axios"
    });

    console.log("PATCH response:", response.data);

    showMessage(
      "patchMessage",
      "Post #1 updated successfully!",
      "success"
    );

  } catch (error) {
    console.error(error);
    showMessage(
      "patchMessage",
      "Failed to update post.",
      "error"
    );
  } finally {
    patchBtn.disabled = false;
  }
});

// DELETE REQUEST - Delete post #1
deleteBtn.addEventListener("click", async function() {
  deleteBtn.disabled = true;
  showMessage("deleteMessage", "Deleting post...", "loading");

  try {
    const response = await axios.delete(API_URL + "/posts/1");

    console.log("DELETE response:", response.status);

    showMessage(
      "deleteMessage",
      "Post #1 deleted successfully!",
      "success"
    );

  } catch (error) {
    console.error(error);
    showMessage(
      "deleteMessage",
      "Failed to delete post.",
      "error"
    );
  } finally {
    deleteBtn.disabled = false;
  }
});

// GET REQUEST - Load all posts automatically
async function getPosts() {
  showMessage("getMessage", "Loading posts...", "loading");

  try {
    const response = await axios.get(API_URL + "/posts");

    postsContainer.innerHTML = "";

    // Loop through every post
    response.data.forEach(function(post) {
      const card = document.createElement("div");
      card.className = "post-card";

      const number = document.createElement("span");
      number.className = "post-number";
      number.innerText = "POST #" + post.id;

      const title = document.createElement("h3");
      title.innerText = post.title;

      const body = document.createElement("p");
      body.innerText = post.body;

      const button = document.createElement("button");
      button.className = "comments-btn";
      button.innerText = "View Comments";

      const commentsList = document.createElement("div");
      commentsList.className = "comments-list";
      commentsList.hidden = true;

      // BONUS - Load comments for each post
      button.addEventListener("click", async function() {
        if (!commentsList.hidden) {
          commentsList.hidden = true;
          button.innerText = "View Comments";
          return;
        }

        button.disabled = true;
        commentsList.hidden = false;
        commentsList.innerText = "Loading comments...";

        try {
          const commentsResponse = await axios.get(
            API_URL + "/posts/" + post.id + "/comments"
          );

          commentsList.innerHTML = "";

          commentsResponse.data.forEach(function(comment) {
            const commentBox = document.createElement("div");
            commentBox.className = "comment";

            const name = document.createElement("strong");
            name.innerText = comment.name;

            const email = document.createElement("p");
            email.innerText = comment.email;

            const text = document.createElement("p");
            text.innerText = comment.body;

            commentBox.appendChild(name);
            commentBox.appendChild(email);
            commentBox.appendChild(text);

            commentsList.appendChild(commentBox);
          });

          button.innerText = "Hide Comments";

        } catch (error) {
          console.error(error);
          commentsList.innerText = "Failed to load comments.";
          button.innerText = "Retry Comments";
        } finally {
          button.disabled = false;
        }
      });

      card.appendChild(number);
      card.appendChild(title);
      card.appendChild(body);
      card.appendChild(button);
      card.appendChild(commentsList);

      postsContainer.appendChild(card);
    });

    showMessage(
      "getMessage",
      response.data.length + " posts loaded successfully!",
      "success"
    );

  } catch (error) {
    console.error(error);
    showMessage(
      "getMessage",
      "Failed to load posts. Please refresh the page.",
      "error"
    );
  }
}

// Run GET automatically when the page loads
getPosts();
