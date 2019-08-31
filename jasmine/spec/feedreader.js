
/* This is the testing code that using jasmine testing framework
 * this code is meant to test the RSS Feed Reader 
 * My name is Danny Mousa 
 * Date : August 30, 2019
 * We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    // This is our first test suite. This suite is all about the RSS feeds definitions
    describe('RSS Feeds', function() {

        /* this is the "beforsEach()" function which i use here to make a "custom matcher"
         * so i can use here inside this suite
         */
        beforeEach(()=>{

            jasmine.addMatchers({
                /* this "custom matcher" is meant to ensure that the 
                 * "actual" value is( defined & sting data type & not empty string)
                 */
                toBeDefinedAndStringAndNotEmpty: function(){
                    return{
                        compare : function(actual){
                            var result={};
                            result.pass=((typeof actual !== undefined)&&(typeof actual === 'string')&&(actual!==''));
                            result.message=`The actual value: ${actual} doesn't meet the requirement` ;// the failure message
                            return result;
                        }
                    };
                }
            });

        });

        // this is the (spec 1) which is meant to variable "allFeeds" is defined and not an empty array
        it('allFeeds variable has been defined and that it is not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        /* this is the (spec 2) that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and its data type is string
         * and that the URL is not empty.
         */
        it('every feed should has a defined & not empty url', ()=>{

            for (const feed of allFeeds){

                expect(feed.url).toBeDefined();
                expect(feed.url.constructor).toBe(String);
                expect(feed.url).not.toBe('');
            }
        });

        /* this is the (spec 3) that loops through each feed
         * in the allFeeds object and ensures (USING MY CUSTOM MATCHER)
         * that each feed has a name defined
         * and its data type is string
         * and that the URL is not empty.
         */
        it('every feed should has a defined & not empty name', ()=>{

            for (const feed of allFeeds){
                expect(feed.name).toBeDefinedAndStringAndNotEmpty();
            }
        });
    });

    //the second suite which is meant to check the menu functionality
    describe('The menu', ()=>{
        
        // this is the (spec 4) which ensures that The menu element should be hidden by default
        it("The menu element should be hidden by default", ()=>{

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* this is the (spec 5) which ensures that The menu element should change visibility
         * when the menu icon is clicked
         */
        it("The menu element should change visibility when the menu icon is clicked", ()=>{

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
    //the third suite which ensures that the initial feed is meeting the expected feed
    describe('Initial Feed', ()=>{
        
        /* here we should use the beforeEach() with the special jasmine function "done" 
         * as parameter
         * bacause the loadFeed function is executed asynchronously
         */
        beforeEach((done)=>{
             loadFeed(0, done);
        });

        /* this is the (spec 6) which ensures that The initial feed is what it is specified by the
         * "init()" function which is located at the line 30 in the app.js file
         * and according to that function => the initial feed should meet the first item in the
         * allFeeds array (allFeeds[0])
         */
        it('should be the expected feed which is specified at the first item in the allFeeds array', (done)=>{

           
            const specifiedFirstName = allFeeds[0].name;

            /* in general, the following is the name of the choosen feed
             * but in my case, it is the default feed name.
             * because when i call loadFeed(0) i simulate what is happening
             * when the default load is occurring by calling init() function
             * which contains the calling of loadFeed(0) function
             * of course, this will be assigned after the 
             * loadFeed(0, done) finishes its work and send the "Udacity Blog"
             * to the ".header-title" html element in addition to doing some
             * proper related things to finally load the default inintial
             * feed which has the "Udacity Blog" name */
            const actualFirstFeedName = $('.header-title').text();
            expect(actualFirstFeedName).toBe(specifiedFirstName);
            done();
        });
    });

    // the forth suite 'Initial Entries' 
    describe('Initial Entries', ()=>{
        
        /* here we should use the beforeEach() with the special jasmine function "done" 
         * as parameter
         * bacause the loadFeed function is executed asynchronously
         */
        beforeEach((done)=>{

            loadFeed(0,done);
        });

        /* this is the (spec 7) which  ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it("ensures that there is at least a single .entry element within the .feed container", (done)=>{

            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });     

    // the FIFTH suite 'New Feed Selection'
    describe('New Feed Selection', ()=>{

        /* My conniction to internet is unstable with very very low connection speed,
         * in addotion to tha large size of the "Linear Digressions" feed
         * which requires (according to my network connection speed :D ) 
         * a long time (about 75 seconds)to be pulled from the remote server,  
         * so the jasmine default timeout (5 seconds) is not enough
         * to make this spec works without throwing an error.
         * so to avoid my network connection problems i had to 
         * set "jasmine.DEFAULT_TIMEOUT_INTERVAL" to "Math.pow(2, 31) - 1"
         * to ensure that this spec will run correctly
        */
        let MAX_SAFE_TIMEOUT = Math.pow(2, 31) - 1;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = MAX_SAFE_TIMEOUT;

        // variables hold the contents of feeds
        let defaultFeed,
            nextFeed,
            thirdFeed,
            forthFeed;

        beforeEach((done)=>{
            // we need "done" in the line 209

            jasmine.addMatchers({

                /* this "custom matcher" is meant to ensure that the 
                 * "actual" value does not equal the "expected" value
                 * which actually ensures that the previous feed does not equal
                 * the current feed, and the loadFeed loads different feed when it 
                 * is called( when we move from feed to another) 
                 */
                doesNotEqualTheFeed: function(){
                    return{
                        compare : function(actual, expect){
                            var result={};
                            result.pass=(actual !== expect);
                            result.message= `The actual value:\n\n${actual}\n\nis equal to the expect value:\n\n${expect}`;
                            return result;
                        }
                    };
                }
            });

            // assigning each feed content to a different variable
            loadFeed(0, ()=>{
                defaultFeed=$('.feed').html();

                loadFeed(1,()=>{
                    nextFeed=$('.feed').html();

                    loadFeed(2, ()=>{
                        thirdFeed= $('.feed').html();
                    
                        loadFeed(3, ()=>{
                            forthFeed= $('.feed').html();
                            done();// telling jasmine that it's the time to go to test the expectations
                        });
                    });    
                });
            });   
        });

        /* this is the (spec 8) to ensure that when a new feed
         * is loaded by the loadFeed function, should the content actually changes
         */
        it("when a new feed is loaded by the loadFeed function, should the content actually changes", (done)=>{

           /* ensures that every variable has a value of "string" data type
            * and the assignment of each feed content to the specific variable
            * is occured correctly
            */
           expect(defaultFeed.constructor).toBe(String);
           expect(nextFeed.constructor).toBe(String);
           expect(thirdFeed.constructor).toBe(String);
           expect(forthFeed.constructor).toBe(String);

           // all possible navigations among four feeds, excluding clicking the same currently feed
           expect(nextFeed).doesNotEqualTheFeed(defaultFeed);

           expect(thirdFeed).doesNotEqualTheFeed(nextFeed);
           expect(thirdFeed).doesNotEqualTheFeed(defaultFeed);

           expect(forthFeed).doesNotEqualTheFeed(defaultFeed);
           expect(forthFeed).doesNotEqualTheFeed(nextFeed);
           expect(forthFeed).doesNotEqualTheFeed(thirdFeed);

           done();// Telling jasmine that the testing of this spec is ended
        });

        // Setting the "jasmine.DEFAULT_TIMEOUT_INTERVAL" back to its default value (5s)
        afterEach(function() {
           jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });     
}());
