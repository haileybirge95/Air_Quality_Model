# Air Quality Prediction: Developing Public Environmental Health Awareness

## Relevance: Air quality is one of the most critical environmental components in public health as it affects every system in the human body. 
The impact of air quality begins in utero and continues throughout our life span.
It is one of the leading factors in many diseases. 
In addition to human welfare implications, air quality is also a key predictor of health in ecological systems.
Air quality is a determining factor in the health of every living creature in a region, and the ability to classify air quality using environmental metrics is paramount in keeping the public informed. 
## Purpose: To develop a user-friendly interface powered by a model that will generate a prediction on air quality when provided with 9 parameters.
The significance of this application is that it provides an accessible, user friendly interface in which to submit metrics from the region of interest and receive a prediction with good accuracy on air quality. This provides the public with relevant information to help inform decisions and spread awareness.
## Implementation: 
  1. Data pre-processing including checking for missing values and class distribution, scaling and normalizing skewed features, and splitting the data into features and target arrays.
  2. Creating and testing the models (random forest, k-nearest neighbors, and neural network).
  4. Developing the air quality prediction application, which involved loading the chosen model and its scaler into the flask app and creating the sliding scales for the user to manipulate within the HTML and JS files.
## Model Assessment:
# Random Forest
The classification report and the confusion matrix that were used to assess the performance of the random forest model revealed strong accuracy and precision. The class with the least accuracy was the "Hazardous" class, with 16 false positives and 9 false negatives.
![rfclassificationreport.png](https://imgur.com/BMvODtZ)



To use the application, follow these steps:
  1. Ensure that the Flask library is installed.
  2. In the terminal, navigate into the flask_app folder and run the application with the command: python app.py
  4. Copy the URL that appears in the terminal and paste it into your browser bar.
  5. The Air Quality Prediction app will appear. Use the sliders to enter your environmental parameters and click "Predict" to view the predicted air quality associated with the values input.
