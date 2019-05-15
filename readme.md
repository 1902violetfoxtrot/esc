# ESCAPE

A web application that gives users travel destination recommendations, the flight costs for those destinations based on images they upload or images from the user’s Instagram feed, their budget, number of people traveling and travel time constraints.

[Visit here!](https://lets-esc.herokuapp.com/)
![Results Map](https://raw.githubusercontent.com/1902violetfoxtrot/esc/master/images/esc2.png)


## How It Works
Step 1 is image identification. Images are uploaded manually by the user, or loaded from the user's Instagram account. They're passed on to be indentified in the Google Cloud Vision API. Labels are returned and further categorized into the tags that we use to organize potential travel destinations.

From there, we move on to identifying the ideal vacation destinations. Each location has a list of labels associated with it describing what attractions can be found there, e.g. "beach," "museum," "forest." The 5 locations with the most matching labels are selected as potential destinations.

Now that we have the locations, we need to find flights. Airports are associated with each location, so we have the terminals, but not the origin. It's at this point we ask the Amadeus API for the airports closest to the user's longitude and latitude, which we take from their browser's location, if they allow us.

Flights from one airport to another can be searched for through, again, the Amadeus API, and narrowed down to the dates that the user inputted into the form. In the case that no flights are found for the given date, the origin airport is moved to the next nearest airport. After three airports with no flights, the destination is discarded.

After discarding the flight suggestions that go above the user's given budget, remaining results are given to the user and displayed on a handy map. Destinations and prices of suggested flights are listed on the right-hand side.

## How to Run Locally
Required:
* git
* node.js
* node package manager
* redis
* .env with an Instagram API key, Google API key, and AWS access key as environmental variables

1. Clone this repository by pasting `git clone https://github.com/1902violetfoxtrot/esc.git` into your terminal or command line.
2. Enter the folder through `cd esc`.
3. Type `npm install` to install all required packages.
4. Run `redis-server` in one terminal or command line window, concurrent with
5. `npm run start-server` to start the server.
6. Go to http://localhost:8080.
7. There it is!

![Input Form](https://raw.githubusercontent.com/1902violetfoxtrot/esc/master/images/esc1.png)
