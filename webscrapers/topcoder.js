"use strict";
var Webscraper = require("./webscraper")


// Define Constants Here
const FUTURE_CONTEST_API_URL = "https://kontests.net/api/v1/top_coder";

/* This is the main scraper function where your jquery code goes.  

    Attributes: 
      $: Use it for jquery operations
    returns the processed data it extracted.
*/
function future_contest_scraper($, page) {
  // process data
  page.data.futureContests = [];

  page.html.forEach((element) => {
    var link = "topcoder.com/challenges";
    // var stime = new Date(element.contest_start_date_iso).getTime() / 1000;
    // var etime = new Date(element.contest_end_date_iso).getTime() / 1000;

    var contest = {};
    //contest.code = element.name;
    contest.name = element.name;
    contest.start_time = element.start_time;
    contest.end_time = element.end_time;
    contest.action_link = link;

    page.data.futureContests.push(contest);
  });

  return page.data.futureContests;
  //console.log(present_contest_data);
}
/* Final Functions Available from this modules */
exports.futureContests = (callback) => {

    // initiate a webscraper instance
var contestPageScraper = new Webscraper(FUTURE_CONTEST_API_URL);


  if (contestPageScraper.data.futureContests != null) {
    //console.log("Showing Cached Output: ");
    callback(contestPageScraper.data.futureContests);
  } else {
   // console.log("Fetching and scraping: ");
    contestPageScraper.fetch(callback, future_contest_scraper);
  }
};
