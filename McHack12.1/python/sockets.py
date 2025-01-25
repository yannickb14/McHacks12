import asyncio
import websockets
import transformers
import torch
import json
import os
from transformers import AutoModelForSequenceClassification, AutoTokenizer

class Review():
    def __init__(self, title, body, rating, date, uuid, status):
        self.title = title
        self.body = body
        self.rating = rating
        self.date = date
        self.uuid = uuid
        self.status = status


# The WebSocket server's URL
SERVER_URL = "ws://localhost:8080"

# Path to the extracted model directory
model_path = "../package/static/model/DistilBERT/BERT_saved"

# Load the fine-tuned model
model = AutoModelForSequenceClassification.from_pretrained(model_path)

# Load the tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path)

# The function to handle messages
async def listen_to_server():
    async with websockets.connect(SERVER_URL) as websocket:
        print("Connected to WebSocket server")

        try:
            while True:
                # Wait for a message from the server
                message = await websocket.recv()
                #Parse message
                parsedReviews = json.loads(message)
                for review in parsedReviews:
                    inputs = tokenizer(review["body"], return_tensors="pt", truncation=True)
                    # Perform inference
                    outputs = model(**inputs)
                    logits = outputs.logits
                    probabilities = logits.softmax(dim=-1)
                    # Interpret results
                    predicted_label = probabilities.argmax(dim=-1).item()
                    review["status"] = predicted_label
                    print("sent thing back")
                await websocket.send(json.dumps(parsedReviews))
                print("Received message!")

        except websockets.exceptions.ConnectionClosed as e:
            print(f"Connection closed: {e}")

# Run the WebSocket client
asyncio.run(listen_to_server())
