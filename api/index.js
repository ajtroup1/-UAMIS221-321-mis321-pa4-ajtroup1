let myWorkouts = []
//ONLOAD



async function handleOnLoad() {
    await populateArray()
    populateTable();

    //start add table

    let html=`
    <div id="tableBody"></div>
    
    <form onsubmit="return false">
            <table class="table" border=2>
            <th id="add-header"><h3><b>Add Workout</b></h3></th>
            <tr>
                <td><label for="data">Date</label>
                <input type="text" placeholder = "YYYY-MM-DD" id="date"></td>
            </tr>
            <tr>
                <td><label for="workout">Workout</label>
                <input type="text" id="workout"></td>
            </tr>
            <tr>
                <td><label for="distance">Distance</label>
                <input type="text" id="distance"></td>
            </tr>
            <tr>
                <td><button onclick="handleAddWorkout()" onclick="clearTextBoxes()"class="btn btn-primary">Add</button></td>
            </tr>
        </table>
    </form> 
    `
    
    document.getElementById('app').innerHTML=html

}

//Update
async function populateArray(){
    let response = await fetch('http://localhost:5028/api/Workout')
    myWorkouts = await response.json()
}
async function populateTable() {
    console.log(myWorkouts)
    sortDates()
    let html=` 
    <table class = "table" border=1>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Workout</th>
                    <th>Distance</th>
                    <th>Pin</th>
                    <th>Delete</th>
                </tr>
            </thead>`
    myWorkouts.forEach(function(workout) {
        if(workout.deleted==false){
        html += `
        <tr>
            <td>${workout.date}</td>
            <td>${workout.name}</td>
            <td>${workout.distance}</td>
            `
        if(workout.pinned==true){
            html+=`
            <td><button name="pin" onclick="handlePin('${workout.id}')">Unpin</button></td>
            `
        }
        else {
            html+=`
            <td><button name="pin" onclick="handlePin('${workout.id}')">Pin</button></td>
            `
        }
        html+=`
            <td><button onclick="handleDeleteWorkout('${workout.id}')" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    else{
        //do nothing
    }
    })
    html+=`</table>`; //end list table
    document.getElementById('listTable').innerHTML=html
}
function sortDates() { // YYYYY-MM-DD format
    myWorkouts.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}


//Workout instance manipulation
async function handleAddWorkout() {
    let workoutDate = new Date(document.getElementById('date').value)
    let workoutName = document.getElementById('workout').value
    let workoutDistance = document.getElementById('distance').value
    let workoutID= 0
    let Wpinned = false
    let Wdeleted = false
    // console.log("temp obj", workoutT)
    const response = await fetch('http://localhost:5028/api/Workout', {
        method: 'POST',
        body: JSON.stringify({
            date: workoutDate,
            distance: workoutDistance,
            name: workoutName,
        }),
        headers: {

            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    
    if (response.status === 200) {
        // POST request was successful
        document.getElementById('date').value = '';
        document.getElementById('workout').value = '';
        document.getElementById('distance').value = '';
        populateTable();
    } else {
        // Handle error in case the POST request fails
        console.error('Failed to add workout:', response.statusText);
    }
    
}
async function handleDeleteWorkout(id) {
    myWorkouts.forEach(function(workout) {
        if(workout.id == id)
            workout.deleted = !workout.deleted
    });

    const response = await fetch(`http://localhost:5028/api/Workout/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            deleted: true
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });

    if (response.status === 200) {
        // Successfully updated
        populateTable();
    } else {
        // Handle error in case the PUT request fails
        console.error('Failed to soft delete workout:', response.statusText);
    }
    populateTable()
}

async function handlePin(id) {
    // Toggle the pinned status in the client-side array
    myWorkouts.forEach(function(workout) {
        if (workout.id == id)
            workout.pinned = !workout.pinned;
    });
    
    // Get the new pinned status
    const newPinnedStatus = myWorkouts.find(workout => workout.id == id).pinned;
    
    // Update the pinned status on the server
    await updatePinStatus(id, newPinnedStatus);
}
async function updatePinStatus(id, pinned) {
    const response = await fetch(`http://localhost:5028/api/Workout/pinned/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            pinned: pinned
        }),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    });

    if (response.status === 200) {
        // Successfully updated
        populateTable();
    } else {
        // Handle error in case the PUT request fails
        console.error('Failed to update pin status:', response.statusText)
    }
}
