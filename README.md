# Feed Reader Testing

## What is Jasmine
Jasmine is a Behavior Driven Development testing framework for JavaScript. It does not rely on browsers, DOM, or any JavaScript framework. Thus it's suited for websites, Node.js projects, or anywhere that JavaScript can run.

## How to run this project :
   - To run the project directly,please click [here](https://danny-mousa.github.io/feed-reader-RSS/.).
   - For developers: the project repository is [here](https://github.com/Danny-Mousa/feed-reader-RSS).
   - Or you can `clone` this repo or `download` it as a `.zip` flie, then open the `index.html` file and you can see the testing results at the page bottom 

## Project Overview:
> I was given a web-based application that reads RSS feeds, and my task is to write a testing code using Jasmine testing framework to make sure that the basic functionalities of the app are working as expected

 The project consists of five test suites including eight specs:

  - `RSS Feeds` suite, incluides the following specs:
    - `allFeeds variable has been defined and that it is not empty` spec
    - `every feed should has a defined & not empty url` spec
    - `every feed should has a defined & not empty name` spec

  - `The menu` suite, incluides the following specs:
    - `The menu element should be hidden by default` spec
    - `The menu element should change visibility when the menu icon is clicked` spec

  - `Initial Feed` suite, includes the following spec:
    - `should be the expected feed which is specified at the first item in the allFeeds array`

  - `Initial Entries` suite, incluides the following spec:
    - `ensures that there is at least a single .entry element within the .feed container` spec

  - `New Feed Selection` suite, incluides the following spec:
    - `when a new feed is loaded by the loadFeed function, should the content actually changes` spec


## How to build
 If you want to build your own testing code using jasmine, you have to do just one of the following approaches :
- (`I used this approach in this project`) Install Jasmine standalone on your local box (where {#.#.#} below is substituted by the release number downloaded):

    - Download the standalone distribution for your desired release from the [releases page](https://github.com/jasmine/jasmine/releases)
    - Create a Jasmine directory in your project - `mkdir my-project/jasmine`
    - Move the dist to your project directory - `mv jasmine/dist/jasmine-standalone-{#.#.#}.zip my-project/jasmine`
    -  Change directory - `cd my-project/jasmine`
    -  Unzip the dist - `unzip jasmine-standalone-{#.#.#}.zip`
 
    -  Add the following to your HTML file:
     ```
    <link rel="shortcut icon" type="image/png" href="jasmine/lib/jasmine-{#.#.#}/jasmine_favicon.png">
    <link rel="stylesheet" type="text/css" href="jasmine/lib/jasmine-{#.#.#}/jasmine.css">
        
    <script type="text/javascript" src="jasmine/lib/jasmine-{#.#.#}/jasmine.js"></script>
    <script type="text/javascript" src="jasmine/lib/jasmine-{#.#.#}/jasmine-html.js"></script>
    <script type="text/javascript" src="jasmine/lib/jasmine-{#.#.#}/boot.js"></script>
    ```

- If you want to built using [jasmine-jquery](https://www.npmjs.com/package/jasmine-jquery) => all you need is to click [here](https://www.npmjs.com/package/jasmine-jquery) to benefit from custom matchers which are provided by this library, but before you need the following previous installation: 
    - Node.Js and npm from [here](https://www.npmjs.com/get-npm)
    - jasmine-jquery from [here](https://www.npmjs.com/package/jasmine-jquery)

- For  `Jasmine NPM module` click [here](https://github.com/jasmine/jasmine-npm)
- For `Jasmine Ruby Gem` click [here](https://github.com/jasmine/jasmine-gem)
- For `Jasmine Python Egg` click [here](https://github.com/jasmine/jasmine-py)
- For `Jasmine headless browser gulp plugin` click [here](https://github.com/jasmine/gulp-jasmine-browser)

## How i build this project
 I used the first approach from the previous section (`How to build`) with the release number of [3.3.0](https://github.com/jasmine/jasmine/releases/tag/v3.3.0)
 which is released on  Oct 25, 2018

## Additional suite with its spec which i added
I noticed that it is important to ensure that the feed page we want to be the default loaded feed when first load is occuring, so i added an additional suite which i called `Initial Feed`, and i added the `should be the expected feed which is specified at the first item in the allFeeds array` spec to it.
This `spec` ensures that The initial feed is what it is specified by the `init()` function which is located at the line 30 in the `app.js` file and according to that function => the initial feed should meet the first item in the `allFeeds` array `(allFeeds[0])`
#### How This Spec Do its Work
The code of the entire this suite is:
```
describe('Initial Feed', ()=>{
        beforeEach((done)=>{
             loadFeed(0, done);
        });
        
        it('should be the expected feed which is specified at the first item in the allFeeds array', (done)=>{
            const specifiedFirstName = allFeeds[0].name;
            const actualFirstFeedName = $('.header-title').text();
            expect(actualFirstFeedName).toBe(specifiedFirstName);
            done();
        });
    });
```
In general this line of code `const actualFirstFeedName = $('.header-title').text();`
is the name of the choosen feed but in my case, it is the default feed name,
because when i call `loadFeed(0)` i simulate what is happening when the default load is occurring by calling `init()` function which contains the calling of `loadFeed(0)` function.
 of course, this will be assigned after the `loadFeed(0, done)` finishes its work and send the `"Udacity Blog"` to the `".header-title"` html element in addition to doing some proper related things to finally load the default initial feed which has the `"Udacity Blog"` name
 And with `const specifiedFirstName = allFeeds[0].name;` we hold the name property value of the first item in `allFeeds` array which is the required default name to compare with.
 Finally i execute `expect(actualFirstFeedName).toBe(specifiedFirstName);`
 To ensure that the default feed is what we are expecting.
 
## Two Custom Matchers
 I added two custom matchers:
 1. The first one is called: `toBeDefinedAndStringAndNotEmpty`
 which i used to ensure that the `actual` value is `(defined & sting data type & not empty string)`
 2. The second one is called: `doesNotEqualTheFeed`
 which i used to ensure that the `actual` value does not equal the `expected` value which actually ensures that the `previous feed` does not equal the `current feed`, and the `loadFeed` function loads different feed when it is called( when we move from feed to another)

## Useful Resources 
 - these following resources may help you to get more understand about what is going on  this project:
    - Resources for this project
        - [jasmine](https://jasmine.github.io/index.html)
        - [Jasmine cheatsheet](https://devhints.io/jasmine)
        - [Testing Async Functions](https://stackoverflow.com/questions/45578981/spec-has-no-expectations-jasmine-testing-the-callback-function?rq=1)
        - [jQuery.ajax()](https://api.jquery.com/jquery.ajax/)
        - [jQuery](https://api.jquery.com/)

## The Author
This project is developed by [Danny Mousa](https://www.linkedin.com/in/danny-mousa-63475a180/) being a required project for Udacity FEND Nanodegree program.
  
## Support
> If you like this repo and find it useful, please consider (★) starring it, so that it can reach a broader audience.
