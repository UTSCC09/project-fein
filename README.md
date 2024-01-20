# FEIN

## Project URL

https://fein.vercel.app/ (backend deployment down)

## Project Video URL 

https://youtu.be/5d7F55Js93Y

## Project Description

Our app aims to provide users with a platform to practice buying and selling stocks using our own fake currency system, while maintaining the integrity and realism of stock market interaction. The app support 200 stocks that users can buy, sell, and look at graphs of the price over a selected amount of time, while giving some overview information of the companies themselves. The app being made for the purposes of learning to trade on the stock market also allows user to communicate in live chatrooms independant to each stock to learn more from others. The app will allow the user to see a summary of all their shares purchased, as well as any net gains or losses.

## Development

The app is built using Next js on the frontend using Tailwind.css, and the Rechart library to graph stock price data. On the backend we used express framework, MongoDb as the database and the Mongoose library to connect to it, sockets to create the live chat feature, a lot of the normal libraries from class labs (ex. express-session, cookie, bcrypt etc.), Finnhub and twelve data APIs to get stock information, and memcached to cache that data. The code is designed in a way such that the frontend calls the backend using functions in api.mjs and then the backend does all the fetching from database, cache, or APIs, frontend handles the response to display to user.   

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. There is a lot of asynchronous things happening on the backend such as getting data from database or fetching from a third party API or working with memcached. It required a lot of debugging to get things working sometimes
2. Stock APIs are very limited (at least the free tier) and getting around that was challenging
3. Setting up the dockers and having them compatible with the VM for deploying.

## Contributions

Avik Chakraborty: Did most of backend (all of the endpoints, session and cookie configuration, security of the app, created the MongoDB database, working with memcached) and some of the frontend (signup, login, displaying on profile page, selling and buying stocks functionality), and helped with some of the deployment

Austin Bartolome: Did most of the frontend (the next js and tailwind configuration, the routing, creating the "look" of the app, most of the components, the stock price Graphs using Recharts), did all the sockets stuff on the backend, and most of the deployment work

