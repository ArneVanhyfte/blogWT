# [blogWT](https://arnevanhyfte.ikdoeict.be/)
Blog made for Web Topics
ArneDives is a free to view blog with open source code in case you want to make your own using my code. It features a home page with a few recent posts and a tribute to the pioneer of diving with pictures retrieved from wikidata using a sparql query. There are auto generated detail pages of the posts with a map displaying the location and there is an overview page of all posts with a map containing markers of all dives featured.
Overall the project features functional css in form of TailwindCSSS, data retrieved through a sparql query, usage tracking with google analytics, maps made with OpenLayers and all post data along with the pictures are stored and retrieved from a Google Firebase database.

features
--------
### Firebase

This projects gets all of the post and comment data from a firebase database. [learn more](https://firebase.google.com/) It's really comprehensive and easy to use. It has  features allowing for instant display of new or changed data.
[A great firebase tutorial](https://youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb)

### OpenLayers
Although it can be a bit annoying in use sometimes, openlayers is a nice tool to display custom map. [Learn more](https://openlayers.org/) You could do a lot more with OL than I did but it requires some time invested to get it the way you want.

### Linked data
This topic can be quite tricky to understand since it's so different to any normal databases we're used to. This tutorial really helped me understand basic SPARQL [link](https://docs.data.world/tutorials/sparql/). It does take some time familiarizing yourself with the predicates and subject types of wikidata in order to get any usefull data from the sparql endpoint. This endpoint is also quite slow, this is why I hid the section containing the wikidata content untill it came through.

### Digital marketing
Though it can be an extremely usefull tool for businesses looking to better their marketing, it wasn't of much use here. I am able to see the data Google Analytics tracked in the analmytics console but it isn't of much worth to me. [Learn more](https://analytics.google.com/analytics/web/)

### functional css
For this topic I chose to use [TailwindCSS](https://tailwindcss.com/). If you have a decent understanding of regular css it's quite easy to use tailwind instead as long as you take some time familiarizing yourself with the classes. Luckily the documentation on their site is easy to read and find the stuff you need. It also supports custom values and classes should you so want to. The whole project is designed with Tailwind.

Deployment
==========

#### You need node.js for this! You can download it [here](https://nodejs.org/)

### Parcel

npm i parcel
I used parcel to bundle my project in development and to build the final version. 
1. use npm start to launch a localhost build for development
2. use npm build to build the project 
These script are already configured in the [package.json](package.json)

### FirebaseConfig
Make sure to add your personal FirebaseConfig details in [map_getPosts.js](build/js/map_getPosts.js), [getPostInfo.js](build/js/getPostInfo.js) and [comments.js](build/js/comments.js)
The docs in your posts collection should have auto-id along with 4 fields:
1. title of type string
2. text of type string
3. location of type geopoint
4. img array with the relative links of the pictures in your storage as type string

The docs in your comments collection should also have auto id along with 3 fields:
1. id of type string containing the id of the post it's about
2. name of type string
3. text of type string
