# FEIN

## Project URL

**Task:** Provide the link to your deployed application. Please make sure the link works. 

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app
Our app aims to provide users with a platform to practice buying and selling stocks using our own fake currency system, while maintaining the integrity and realism of stock market interaction. The app support 200 stocks that users can buy, sell, and look at graphs of the price over a selected amount of time, while giving some overview information of the companies themselves. The app being made for the purposes of learning to trade on the stock market also allows user to communicate in live chatrooms independant to each stock to learn more from others. The app will allow the user to see a summary of all their shares purchased, as well as any net gains or losses.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 
The app is built using Next js on the frontend using Tailwind.css, and the Rechart library to graph stock price data. On the backend we used express framework, MongoDb as the database and the Mongoose library to connect to it, sockets to create the live chat feature, a lot of the normal libraries from class labs (ex. express-session, cookie, bcrypt etc.), Finnhub and twelve data APIs to get stock information, and memcached to cache that data. The code is designed in a way such that the frontend calls the backend using functions in api.mjs and then the backend does all the fetching from database, cache, or APIs, frontend handles the response to display to user.   

## Deployment

**Task:** Explain how you have deployed your application. 

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. There is a lot of asynchronous things happening on the backend such as getting data from database or fetching from a third party API or working with memcached. It required a lot of debugging to get things working sometimes
2. Stock APIs are very limited (at least the free tier) and getting around that was challenging
3. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number).
Avik Chakraborty: Did most of backend (all of the endpoints, session and cookie configuration, security of the app, created the MongoDB database, working with memcached) and some of the frontend (signup, login, displaying on profile page, selling and buying stocks functionality), and helped with some of the deployment

Austin Bartolome: Did most of the frontend (the next js and tailwind configuration, the routing, creating the "look" of the app, most of the components, the stock price Graphs using Recharts), did all the sockets stuff on the backend, and most of the deployment work

# One more thing? 

**Task:** Any additional comment you want to share with the course staff?
During development the we were just using Finnhub for our stock API, but the endpoint to get the candle information of the stock was made a premium feature midway development so we had to spend some time searching for alternatives and where we found twelve data. 
Also working with memcached was really painful especially when deploying and took a lot of time.
We also created the idea for the app when we had 3 people in the group, but one of the members had to drop the course and we stuck with it with just the two of us. Please keep this in consideration.
