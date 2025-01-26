const fetchedUsernames = new Set();
      const initialUserData = {
        username: "jordwalke",
        avatar_url: "img/977348.jpg",
        name: "Jordan W",
        public_repos: 125,
        public_gists: 18,
        followers: 8991,
        bio: "No bio available",
      };
      const initialUserContainer = document.createElement("div");
      initialUserContainer.classList.add("user-container");
      initialUserContainer.innerHTML = `
        <div class="user-info">
          <img src="${initialUserData.avatar_url}" alt="${initialUserData.username}" class="user-avatar" />
          <div>
            <h2 class="name">${initialUserData.name}</h2>
            <p class="handle">@${initialUserData.username}</p>
          </div>
        </div>
        <div class="userde1">
          <div class="user">
            <span class="user-label">Repos:</span>
            <span class="user-value">${initialUserData.public_repos}</span>
          </div>
          <div class="user">
            <span class="user-label">Gists:</span>
            <span class="user-value">${initialUserData.public_gists}</span>
          </div>
          <div class="user">
            <span class="user-label">Followers:</span>
            <span class="user-value">${initialUserData.followers}</span>
          </div>
        </div>
        <p class="no-bio">${initialUserData.bio}</p>
      `;
      document.getElementById("user-list").appendChild(initialUserContainer);
      fetchedUsernames.add(initialUserData.username); 
      document.getElementById("search-form").addEventListener("submit", async function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();

        if (username === "") {
          alert("Please enter a GitHub username.");
          return;
        }

        if (fetchedUsernames.has(username)) {
          alert("This GitHub account has already been fetched.");
          return;
        }

        const apiUrl = `https://api.github.com/users/${username}`;

        try {
          const response = await fetch(apiUrl);
          const data = await response.json();

          if (data.message === "Not Found") {
            alert("User not found.");
            return;
          }
          const userContainer = document.createElement("div");
          userContainer.classList.add("user-container");
          userContainer.innerHTML = `
            <div class="user-info">
              <img src="${data.avatar_url}" alt="${data.login}" class="user-avatar" />
              <div>
                <h2 class="name">${data.name || "No name available"}</h2>
                <p class="handle">@${data.login}</p>
              </div>
            </div>
            <div class="userde1">
              <div class="user">
                <span class="user-label">Repos:</span>
                <span class="user-value">${data.public_repos}</span>
              </div>
              <div class="user">
                <span class="user-label">Gists:</span>
                <span class="user-value">${data.public_gists}</span>
              </div>
              <div class="user">
                <span class="user-label">Followers:</span>
                <span class="user-value">${data.followers}</span>
              </div>
            </div>
            <p class="no-bio">${data.bio || "No bio available"}</p>
          `;
          document.getElementById("user-list").appendChild(userContainer);
          fetchedUsernames.add(username); 
        } catch (error) {
          console.error("Error fetching data from GitHub API:", error);
        }
      });