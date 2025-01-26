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


    (async function scrollAndReturn() {
        // Calculate 1/5 of the page height
        const oneFifthHeight = document.body.scrollHeight;
    
        // Scroll down by 1/5 of the page height
        window.scrollTo({
        top: oneFifthHeight,
        behavior: "smooth", // Optional: Add smooth scrolling
        });
    
        // Wait for the scrolling to complete (add a delay)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust delay as needed
    
        // Scroll back to the top
        window.scrollTo({
        top: 0,
        behavior: "smooth", // Optional: Add smooth scrolling
        });
    
        // Wait for the scrolling to complete (add another delay)
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust delay as needed
    
        console.log("Scroll completed, continuing script...");
        // Rest of your script goes here



//Try to scrape for different types of review lists
let reviewsContainer = document.querySelector("#cm-cr-dp-review-list");

let recommendedProducts = document.querySelector("#anonCarousel1");
const firstCard = recommendedProducts.querySelector(".a-carousel-card");
const link = firstCard.querySelector(".a-link-normal");



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
        const newlink = link.href;
        console.log(newlink);
        parsedReviews.push(new Review("link", newlink, "No rating", "No date"));
        


    // Find all genome widgets and remove them
    // Select all elements with the data-hook "genome-widget"
    const genomeWidgets = document.querySelectorAll('[data-hook="genome-widget"]');







        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to the WebSocket server');
            setTimeout(() => {
                console.log("This message appears after 10 seconds!");
                // Add your code here
                ws.send(JSON.stringify(parsedReviews));
            }, 1500);
            
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
                                                // Find the profile avatar container
                            const avatarContainer = genomeWidgets[count - 1].querySelector('.a-profile-avatar');

                            if (avatarContainer) {
                                addGreenCheckmark(avatarContainer)
                            }
                }
                else{
                    fakes++;
                    count++;
                

                            // Find the profile avatar container
                            const avatarContainer = genomeWidgets[count - 1].querySelector('.a-profile-avatar');

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



function addGreenCheckmark(avatarContainer) {
    // Ensure the avatar container exists
    if (!avatarContainer) return;

    // Create a green checkmark using a div
    const greenCheck = document.createElement("div");
    greenCheck.style.position = "absolute";
    greenCheck.style.width = "100%"; // Full width of the avatar container
    greenCheck.style.height = "100%"; // Full height of the avatar container
    greenCheck.style.top = "0";
    greenCheck.style.left = "0";
    greenCheck.style.zIndex = "10"; // Ensure it is above the image

    // Set up the parent container for relative positioning
    avatarContainer.style.position = "relative";

    // Create the first diagonal line of the checkmark
    const line1 = document.createElement("div");
    line1.style.position = "absolute";
    line1.style.width = "40%"; // Adjusted for proper proportions
    line1.style.height = "5px"; // Thickness of the line
    line1.style.backgroundColor = "green";
    line1.style.transform = "rotate(-110deg)"; // Rotation for the checkmark
    line1.style.top = "61.2%"; // Position the line appropriately
    line1.style.left = "45%"; // Offset to center the checkmark
    line1.style.transformOrigin = "left";

    // Create the second diagonal line of the checkmark
    const line2 = document.createElement("div");
    line2.style.position = "absolute";
    line2.style.width = "80%"; // Adjusted for proper proportions
    line2.style.height = "5px"; // Thickness of the line
    line2.style.backgroundColor = "green";
    line2.style.transform = "rotate(-45deg)"; // Rotation for the checkmark
    line2.style.top = "55%"; // Position the line appropriately
    line2.style.left = "45%"; // Offset to align with the other line
    line2.style.transformOrigin = "left";

    // Append the lines to the greenCheck div
    greenCheck.appendChild(line1);
    greenCheck.appendChild(line2);

    // Add the green checkmark as an overlay inside the avatar container
    avatarContainer.appendChild(greenCheck);
}
})();