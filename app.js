
// API URL
const url = "https://jsonplaceholder.typicode.com/posts";

// POST - Create a post
document.getElementById("postForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let title = document.getElementById("title").value;
  let body = document.getElementById("body").value;

  document.getElementById("postMessage").innerText = "Sending...";

  axios.post(url, {
    title: title,
    body: body,
    userId: 1
  })
  .then(function(response) {
    document.getElementById("postMessage").innerText =
      "Post created successfully!";
    document.getElementById("postForm").reset();
    console.log(response.data);
  })
  .catch(function(error) {
    document.getElementById("postMessage").innerText =
      "Error creating post.";
    console.log(error);
  });
});

// PATCH - Update post #1
document.getElementById("updateBtn").addEventListener("click", function() {
  document.getElementById("updateMessage").innerText = "Updating...";

  axios.patch(url + "/1", {
    title: "My Updated Post"
  })
  .then(function(response) {
    document.getElementById("updateMessage").innerText =
      "Post updated successfully!";
    console.log(response.data);
  })
  .catch(function(error) {
    document.getElementById("updateMessage").innerText =
      "Error updating post.";
    console.log(error);
  });
});

// DELETE - Delete post #1
document.getElementById("deleteBtn").addEventListener("click", function() {
  document.getElementById("deleteMessage").innerText = "Deleting...";

  axios.delete(url + "/1")
  .then(function(response) {
    document.getElementById("deleteMessage").innerText =
      "Post deleted successfully!";
    console.log(response.data);
  })
  .catch(function(error) {
    document.getElementById("deleteMessage").innerText =
      "Error deleting post.";
    console.log(error);
  });
});

// GET - Display all posts automatically
axios.get(url)
.then(function(response) {
  let posts = response.data;

  document.getElementById("getMessage").innerText =
    "Posts loaded successfully!";

  for (let post of posts) {
    let div = document.createElement("div");
    div.className = "post";

    let heading = document.createElement("h3");
    heading.innerText = post.title;

    let paragraph = document.createElement("p");
    paragraph.innerText = post.body;

    div.appendChild(heading);
    div.appendChild(paragraph);

    document.getElementById("posts").appendChild(div);
  }
})
.catch(function(error) {
  document.getElementById("getMessage").innerText =
    "Error loading posts.";
  console.log(error);
});
