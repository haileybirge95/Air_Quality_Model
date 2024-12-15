$(document).ready(function() {

    // Update the displayed value when the PM2.5 slider is moved
    $('#PM2.5').on('input', function() {
        const value = $(this).val();
        $('#PM2.5-value').text(value);
    });

    // Update the displayed value for all sliders
    $('input[type="range"]').on('input', function() {
        const value = $(this).val();
        $(`#${this.id}-value`).text(value);
    });

    // Form submission logic
    document.getElementById('prediction-form').onsubmit = async function(event) {
        event.preventDefault();

        // Gather input values from sliders
        const feature1 = parseFloat(document.getElementById('Temperature').value);
        const feature2 = parseFloat(document.getElementById('Humidity').value);
        const feature3 = document.getElementById('PM2.5').value; // Get the raw value
        const feature4 = parseFloat(document.getElementById('PM10').value);
        const feature5 = parseFloat(document.getElementById('NO2').value);
        const feature6 = parseFloat(document.getElementById('SO2').value);
        const feature7 = parseFloat(document.getElementById('CO').value);
        const feature8 = parseFloat(document.getElementById('Proximity_to_Industrial_Areas').value);
        const feature9 = parseFloat(document.getElementById('Population_Density').value);

        // Log the PM2.5 slider value for debugging
        console.log("PM2.5 slider value:", feature3); // Log the raw slider value

        // Validate PM2.5 input
        if (feature3 === '' || isNaN(parseFloat(feature3))) {
            alert("Please enter a valid number for PM2.5.");
            return; // Prevent form submission
        }

        // Convert feature3 to float after validation
        const validFeature3 = parseFloat(feature3);

        // Log the PM2.5 value for debugging
        console.log("PM2.5 value before submission:", feature3)

        // Send the input values to the Flask backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Temperature: feature1,
                Humidity: feature2,
                'PM2.5': validFeature3, // Use the validated value
                PM10: feature4,
                NO2: feature5,
                SO2: feature6,
                CO: feature7,
                Proximity_to_Industrial_Areas: feature8,
                Population_Density: feature9
            })
        });

        const data = await response.json();

        if (!response.ok) {
            document.getElementById('result').innerText = 'Error: ' + data.error;
        } else {
            document.getElementById('result').innerText = 'Prediction: ' + data.prediction;
        }
    };
});
