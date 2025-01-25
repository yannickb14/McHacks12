//Create a class for reviews
class Review{
    constructor(title, body, rating, date, uuid, status){
        this.title = title;
        this.body = body;
        this.rating = rating;
        this.data = date;
        this.uuid = uuid;
        this.status = true;
    }
}

var percentofFakes1 = 0;
var averageRating1 = 0;

//Try to scrape for different types of review lists
let reviewsContainer = document.querySelector("#cm-cr-dp-review-list");

if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm_cr-review_list");
}
if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm-cr-global-review_list");
}
if(reviewsContainer){
    //Extract the reviews into an array
    const reviews = reviewsContainer.querySelectorAll('[data-hook="review"]');

    //prepare an array to put the parsed reviews into
    let parsedReviews = [];
    if (reviews){
        reviews.forEach((review) => {
            //Extract the review title
            const title = review.querySelector('[data-hook="review-title"]')?.innerText.trim() || "No Title";
            
            //Extract the review body
            const body = review.querySelector('[data-hook="review-body"]')?.innerText.trim() || "No Body";
            
            //Extract the review rating
            const rating = review.querySelector('[data-hook="review-star-rating"] .a-icon-alt')?.innerText.trim()[0] || "No Rating";
            
            //Extract the review date
            const date = review.querySelector('[data-hook="review-date"]')?.innerText.trim() || "No Date";
            //Instantiate a new review object
            parsedReviews.push(new Review(title, body, rating, date));
        });

        console.log(parsedReviews);  
        
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to the WebSocket server');
            setTimeout(() => {
                console.log("This message appears after 10 seconds!");
                // Add your code here
                ws.send(JSON.stringify(parsedReviews));
            }, 1000);
            
            console.log(JSON.stringify(parsedReviews));
        };

        ws.onmessage = async (event) => {
            let responseText = event.data;
            if (event.data instanceof Blob) {
                responseText = await event.data.text();
            }
            console.log("received message");
            const responseJson = JSON.parse(responseText);
            console.log('Received WebSocket response:', responseJson);
            // Process the response
            let ratings = 0;
            let count = 0;
            let fakes = 0;
        
            responseJson.forEach((review) => {
                if (review.status == 0) {
                    ratings += parseInt(review.rating, 10); // Convert rating to integer if necessary
                    count++;
                }
                else{
                    fakes++;
                    count++;
                }
            });
            averageRating1 = ratings / count;
            percentofFakes1 = Math.round((1 - (fakes / count)) * 100);
            console.log(averageRating1);
            console.log(percentofFakes1);
            console.log(averageRating);
        };
    }

    
}
else{
    console.log("failed to find reviews");
}

export let percentofFakes = percentofFakes1;
export let averageRating = averageRating1;