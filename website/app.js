/* Global Variables */
const APIKey = '62105e2ec4c84cfcdf4bc56731f13c81';
const APIUrl = 'http://localhost:8080/';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();


const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', async () => {

    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (!zipCode) {
        return alert('Please enter the zip code');
    }

    if (!feelings) {
        return alert('Please enter your feelings');
    }

    bigData(zipCode, feelings);
})

async function bigData(zipCode, feelings) {
    try {
        // Getting all the zip code information from the API using async, we get the API link from openweathermap website
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}&units=metric`);
        
        if (res.status === 404 || res.status === 400) {
            return alert('Please enter a valid USA zip code');
        }
        const weatherInfo = await res.json();
        const temp = weatherInfo.main.temp;

        // Posting the data to the server to save it 
        await fetch('/postTheAllData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temp: temp,
                feelings: feelings,
                date: newDate,
            }),
        })

        // Getting the data from the server after we have already saved it in the previous function
        const savedData = await fetch('/getTheAllData');
        const theData = await savedData.json();

        // To update the data into our front UI page
        dynamicallyUpdateUI(theData)
    }
    catch (err) {
        alert('The process in not completed Successfully')
    }
}

// Update User Interface by using dynamicallyUpdateUI function to show the final results
async function dynamicallyUpdateUI(theData) {
    try {
        document.getElementById('date').innerHTML = `Date Is: ${theData.date}`;
        document.getElementById('temp').innerHTML = `Temp Is: ${theData.temp}`;
        document.getElementById('content').innerHTML = `My Feelings Is: ${theData.feelings}`;
    } catch (err) {
        alert('There is a problem in fetching the data, Please try again.');
    }
}
