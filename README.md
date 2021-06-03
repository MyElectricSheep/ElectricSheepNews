#  🐑 ⚡ Electric Sheep News

This is a clone of the [Hacker News](https://news.ycombinator.com/) website.

__It is implemented using React + Tailwind CSS and provides the user with the following:__
🔄 News are refreshed automatically every 30 seconds
🕵️ A search query can be made to filter news only about a specific topic
⏬ Infinite scrolling allows for seamless navigation without pagination
✍️ All comments attached to the original HN story are parsed recursively and color coded for ease of reading

Some functionalities are mocks (eg: upvote / leave a comment) and will trigger a toast message inviting the user to login.

# Where does the data come from?

This version of the Hacker News project is based on the API built on top of Algolia Search's API. 

Electric Sheep News accesses Hacker News data programmatically using this REST API.

[Hacker News Algolia API](https://hn.algolia.com/api)


# 🚀 Live version

A [live version of the app](https://electric-sheep-news.netlify.app/) can be found here!

[![Netlify Status](https://api.netlify.com/api/v1/badges/46582eb9-cdb8-416c-9748-0eaeded1440b/deploy-status)](https://app.netlify.com/sites/electric-sheep-news/deploys)
