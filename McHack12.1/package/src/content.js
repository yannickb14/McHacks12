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
let recommendedProducts = document.querySelector("similarities_features_div");

if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm_cr-review_list");
}
if(!reviewsContainer){
    reviewsContainer = document.querySelector("#cm-cr-global-review_list");
}
if(reviewsContainer){
    //Extract the reviews into an array
    const reviews = reviewsContainer.querySelectorAll('[data-hook="review"]');
    console.log("test");
    console.log(recommendedProducts);
    // const products = recommendedProducts.querySelectorAll('[data-hook="')

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
        


    // Find all genome widgets and remove them
    // Select all elements with the data-hook "genome-widget"
const genomeWidgets = document.querySelectorAll('[data-hook="genome-widget"]');

genomeWidgets.forEach((widget) => {
    // Find the profile avatar container
    const avatarContainer = widget.querySelector('.a-profile-avatar');

    if (avatarContainer) {
        // Create a red "X" using a div
        const redX = document.createElement("div");
        redX.style.position = "absolute";
        redX.style.width = "100%"; // Full width of the avatar container
        redX.style.height = "100%"; // Full height of the avatar container
        redX.style.top = "0";
        redX.style.left = "0";
        redX.style.zIndex = "10"; // Ensure it is above the image

        // Set up the parent container for relative positioning
        avatarContainer.style.position = "relative";

        // Create the two diagonal lines for the "X"
        const line1 = document.createElement("div");
        line1.style.position = "absolute";
        line1.style.width = "100%";
        line1.style.height = "5px"; // Thickness of the line
        line1.style.backgroundColor = "red";
        line1.style.transform = "rotate(45deg)";
        line1.style.top = "50%";
        line1.style.left = "0";
        line1.style.transformOrigin = "center";

        const line2 = document.createElement("div");
        line2.style.position = "absolute";
        line2.style.width = "100%";
        line2.style.height = "5px"; // Thickness of the line
        line2.style.backgroundColor = "red";
        line2.style.transform = "rotate(-45deg)";
        line2.style.top = "50%";
        line2.style.left = "0";
        line2.style.transformOrigin = "center";

        // Append the lines to the redX div
        redX.appendChild(line1);
        redX.appendChild(line2);

        // Add the red "X" as an overlay inside the avatar container
        avatarContainer.appendChild(redX);
    }
});







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