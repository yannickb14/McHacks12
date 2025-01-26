const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

document.addEventListener('DOMContentLoaded', function () {
    console.log("Hello");
    let parsedReviews = [];

        ws.onmessage = async (event) => {
            let percentofFakes;
            let averageRating;
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
            console.log(percentofFakes1);
            console.log(averageRating1);

            document.getElementById("percentageGrade").innerHTML = `${percentofFakes1}%`;
            document.getElementById("percentageGrade1").innerHTML = `${percentofFakes1}%`;

            for (let i = 0; i < averageRating1; i++){
                document.getElementById("starRating").innerHTML += `<div class="star"></div>`;
            }

            // All things that change color
            const container = document.getElementById("container");
            const cardTitle = document.getElementById("cardTitle");

            const line = document.getElementById("hr");
            const line1 = document.getElementById("hr1");

            const blob = document.getElementById("blob");
            const percentageGrade = document.getElementById("percentageGrade");
            const percentageGrade1 = document.getElementById("percentageGrade1");
            const commentIcon = document.getElementById("commentIcon");

            const threeDText = document.getElementById("letterGrade");

            console.log(typeof container);

            
            if (percentofFakes1 < 45){
                document.getElementById("letterGrade").innerHTML = `F`;


                 // Color Bronze + Red + black background
                 container.style.backgroundColor = "black";
                 container.style.borderColor = "#9b7662";

                 // blob
                 blob.style.backgroundColor = "rgba(255, 64, 63, 255)";

                 cardTitle.style.color = '#9b7662';
                 line.style.color = '#9b7662';
                 line1.style.color = '#9b7662';
                 percentageGrade.style.color = '#9b7662';
                 percentageGrade1.style.color = '#9b7662';
                 commentIcon.style.color = '#9b7662';
                 threeDText.style.color = '#9b7662'
                 threeDText.style.textShadow = `
                 1px 1px 1px #c98644,
                 1px 2px 1px #c98644,
                 1px 3px 1px #c98644,
                 1px 4px 1px #c98644,
                 1px 5px 1px #c98644,
                 1px 6px 1px #c98644,
                 1px 7px 1px #c98644,
                 1px 8px 1px #c98644,
                 1px 9px 1px #c98644,
                 1px 10px 1px #c98644,
                 1px 18px 6px rgba(16, 16, 16, 0.4),
                 1px 22px 10px rgba(16, 16, 16, 0.2),
                 1px 25px 35px rgba(16, 16, 16, 0.2),
                 1px 30px 60px rgba(16, 16, 16, 0.4)
             `;
             
            }
            else if (percentofFakes1 < 68){
                document.getElementById("letterGrade").innerHTML = `C`;
                // Color Silver + White

                 container.style.backgroundColor = "#2f2f60";
                 container.style.borderColor = "#cddbdf";

                 // blob
                 blob.style.backgroundColor = "white";

                 cardTitle.style.color = '#cddbdf';
                 line.style.color = '#cddbdf';
                 line1.style.color = '#cddbdf';
                 percentageGrade.style.color = '#cddbdf';
                 percentageGrade1.style.color = '#cddbdf';
                 commentIcon.style.color = '#cddbdf';
                 threeDText.style.color = '#cddbdf'
                 threeDText.style.textShadow = `
                 1px 1px 1px #a3a4a4,
                 1px 2px 1px #a3a4a4,
                 1px 3px 1px #a3a4a4,
                 1px 4px 1px #a3a4a4,
                 1px 5px 1px #a3a4a4,
                 1px 6px 1px #a3a4a4,
                 1px 7px 1px #a3a4a4,
                 1px 8px 1px #a3a4a4,
                 1px 9px 1px #a3a4a4,
                 1px 10px 1px #a3a4a4,
                 1px 18px 6px rgba(16, 16, 16, 0.4),
                 1px 22px 10px rgba(16, 16, 16, 0.2),
                 1px 25px 35px rgba(16, 16, 16, 0.2),
                 1px 30px 60px rgba(16, 16, 16, 0.4)
             `;
             



            }
            else if (percentofFakes1 < 84){
                document.getElementById("letterGrade").innerHTML = `B`;
                // Color Non Rare Gold + Green
                  // Color Silver + White

                  container.style.backgroundColor = "#2f2f60";
                  container.style.borderColor = "#f2e48e";
                  
                  // blob
                  blob.style.backgroundColor = "rgba(171, 240, 209, 255)";
 
                  cardTitle.style.color = '#f2e48e';
                  line.style.color = '#f2e48e';
                  line1.style.color = '#f2e48e';
                  percentageGrade.style.color = '#f2e48e';
                  percentageGrade1.style.color = '#f2e48e';
                  commentIcon.style.color = '#f2e48e';
                  threeDText.style.color = '#f2e48e';
                  threeDText.style.textShadow = `
                  1px 1px 1px #caab50,
                  1px 2px 1px #caab50,
                  1px 3px 1px #caab50,
                  1px 4px 1px #caab50,
                  1px 5px 1px #caab50,
                  1px 6px 1px #caab50,
                  1px 7px 1px #caab50,
                  1px 8px 1px #caab50,
                  1px 9px 1px #caab50,
                  1px 10px 1px #caab50,
                  1px 18px 6px rgba(16, 16, 16, 0.4),
                  1px 22px 10px rgba(16, 16, 16, 0.2),
                  1px 25px 35px rgba(16, 16, 16, 0.2),
                  1px 30px 60px rgba(16, 16, 16, 0.4)
              `;
               
            }
            else{
                document.getElementById("letterGrade").innerHTML = `A`;

                // Color Rare Gold + Green
                container.style.backgroundColor = "#2f2f60";
                container.style.borderColor = "#f2e48e";
                
                // blob
                blob.style.backgroundColor = "rgba(171, 240, 209, 255)";

                cardTitle.style.color = '#f2e48e';
                line.style.color = '#f2e48e';
                line1.style.color = '#f2e48e';
                percentageGrade.style.color = '#f2e48e';
                percentageGrade1.style.color = '#f2e48e';
                commentIcon.style.color = '#f2e48e';
                threeDText.style.color = '#f2e48e';
                threeDText.style.textShadow = `
                1px 1px 1px #caab50,
                1px 2px 1px #caab50,
                1px 3px 1px #caab50,
                1px 4px 1px #caab50,
                1px 5px 1px #caab50,
                1px 6px 1px #caab50,
                1px 7px 1px #caab50,
                1px 8px 1px #caab50,
                1px 9px 1px #caab50,
                1px 10px 1px #caab50,
                1px 18px 6px rgba(16, 16, 16, 0.4),
                1px 22px 10px rgba(16, 16, 16, 0.2),
                1px 25px 35px rgba(16, 16, 16, 0.2),
                1px 30px 60px rgba(16, 16, 16, 0.4)
            `;
             
            }
        };
});