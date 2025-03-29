<div align=center>
  
  <img src="./assets/zephara.png" alt="Velastria" width="95%">

</div>

<br>

--- 

#### _<div align="left"><sub>// Project Overview</sub></div>_

<p align="left">
<strong>Zephara or Zephyr Chat</strong> is the sleek and powerful chat platform designed to be a part of the Zephyr ecosystem—a social media aggregator. Built to foster real-time, seamless communication, offers an unparalleled chat experience.
</p>

> [!NOTE]
> Zephara is a part of the Zephyr ecosystem and is designed to be used in conjunction with zephyr as a chat platform.

#### _<div align="left"><sub>// Local Development</sub></div>_
Zephara uses convex for its db, real-time updates, and authentication. To run the project locally, you need to set up a convex project and install the required dependencies.

```bash
# Clone the repository
git clone https://github.com/parazeeknova/zephara.git

# Navigate to the project directory
cd zephara

# Install the required dependencies
bun install # or bun i

# Set up the convex project (You'll need to create a convex account if you don't have one)
# You can create a convex account at https://www.convex.dev & put your convex creds in .env file
# Check the .env.example file for the required environment variables
# Then run the following command to start the convex backend server: 
bunx convex dev # This will start the convex dev server

# The next step is optional but recommended. It sets up the auth provider for the app.
# For proper Authentication, you need to set up the auth provider. You can do this by running the following command:
# More details for this can be found at: https://labs.convex.dev/auth/config/oauth/github
# To set up the auth provider, you need to create a GitHub OAuth app and get the client ID and secret. 
bunx convex env set AUTH_GITHUB_ID=<your_github_id> # (optional)
bunx convex env set AUTH_GITHUB_SECRET=<your_github_secret> # (optional)

# Start the development server finally
# This will start the zephara dev server
bun run dev
```

#### _<div align="left"><sub>// Analytics</sub></div>_

![Alt](https://repobeats.axiom.co/api/embed/d9e8e5cd0a8d0e8ca56ed2c645a0846ee5a74638.svg "Repobeats analytics image")

#### _<div align="left"><sub>// License</sub></div>_

<p align="left">
<strong>Zephara</strong> is licensed under the <a href="https://github.com/parazeeknova/velastria/blob/main/LICENSE">AGPL License</a>.
</p>

--- ;
