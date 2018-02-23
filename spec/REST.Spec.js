var frisby = require('frisby');

const HOST = require('../config').host + 'api/';

frisby.create('GET first story JSON data from database')
  .get( HOST + 'stories/1' )
  .expectStatus(200)
  .expectJSONTypes({
    uID: Number,
    title: String,
    description: String,
    content: String,
    dateCreated: Date,
    rating: Number,
    tags: [String]
  })
  .expectJSON({
    uID: 1
  })
.toss();
