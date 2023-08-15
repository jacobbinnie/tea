
![screely-1692091200830](https://github.com/jacobbinnie/tea/assets/83803154/f24db66d-1475-4ff4-be49-c554311f6e44)


# Tea - a location based social feed within a 3km radius

Create a post based on your current location. Whenever other authenticated users are within a 3km radius of that location, they'll be able to see and interact with your post.

## Features

- Realtime location based content retrieval
- Upvoting / downvoting / commenting
- Authentication through Google
- Mobile responsiveness
- Lightweight

## How it works

Core stack: Typescript + Next.js + Firebase + Geofire

--

When an authenticated user creates a post, the current latitude and longitude of the user's position are indexer through Geofire against a realtime Firebase backend. This allows for indexing thousands if not millions of records (in theory) based on a 3km circular radius - rather than mapping through endless posts in order to retrieve data.

Once a user's current location is observed, a geofire query is fired to retrieve Firebase database posts associated within the current radius. Pretty neat, right.

What's even cooler is it returns data within milliseconds.

Voting & commenting is handled through standard Firebase apis.

UI is designed using Tailwind. 100% custom components and design.

The entire application is typesafe and super clean as eslint / prettier have been active contributors from first init.

--

I had a great time piecing this build together including some time spent abroad in Europe. PS. Bullet trains through the French countryside are an amazing place to get in the zone for a crystal clear code session.
## Walkthrough


Video:
https://github.com/jacobbinnie/tea/assets/83803154/4e711947-a1e9-439e-8628-d131fe262ad4
