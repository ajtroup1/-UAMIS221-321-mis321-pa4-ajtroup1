let myWorkouts = []

// test workout variables
// let workout1 = {Date: '2020-04-12', Workout: "Jog", Distance: "3 miles", ID: "0a3e868c-6419-4fbb-9ad2-f744657877b2", Pin: false}
// let workout2 = {Date: '2021-04-12', Workout: "Run", Distance: "2 miles", ID: "6398961a-7a0f-4481-a7b3-cbb5ab57069a", Pin: false}
// let workout3 = {Date: '2019-04-12', Workout: "Sprints", Distance: "1 mile", ID: "17b8a11f-702b-400a-a86a-621555756e62", Pin: false}
// myWorkouts.push(workout1)
// myWorkouts.push(workout2)
// myWorkouts.push(workout3)
// localStorage.setItem('myWorkouts', JSON.stringify(myWorkouts))

//ONLOAD



function handleOnLoad() {
    myWorkouts = JSON.parse(localStorage.getItem('myWorkouts'))
    // let tempUUID = uuidv4()
    // console.log(tempUUID)
    // start list table

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
    
    localStorage.setItem('myWorkouts', JSON.stringify(myWorkouts))
    document.getElementById('app').innerHTML=html
    populateTable()
}

//Update
function populateTable() {
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
            </thead>`;
    myWorkouts.forEach(function(workout) {
        html += `
        <tr>
            <td>${workout.Date}</td>
            <td>${workout.Workout}</td>
            <td>${workout.Distance}</td>
            `
        if(workout.Pin==true){
            html+=`
            <td><button name="pin" onclick="handlePin('${workout.ID}')">Unpin</button></td>
            `
        }
        else {
            html+=`
            <td><button name="pin" onclick="handlePin('${workout.ID}')">Pin</button></td>
            `
        }
        html+=`
            <td><button onclick="handleDeleteWorkout('${workout.ID}')" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    })
    html+=`</table>`; //end list table
    document.getElementById('tableBody').innerHTML=html
}
function sortDates() { // YYYYY-MM-DD format
    myWorkouts.sort(function(a, b) {
        return new Date(b.Date) - new Date(a.Date);
    });
}


//Workout instance manipulation
function handleAddWorkout() {
    //testing
    // console.log("button pressed")
    // console.log(document.getElementById('date').value)
    // console.log(document.getElementById('workout').value)
    // console.log(document.getElementById('distance').value)

    let uuidT = uuidv4()
    let workoutT = {Date: document.getElementById('date').value, Workout: document.getElementById('workout').value, Distance: document.getElementById('distance').value, ID: uuidT, Pin: false}
    myWorkouts.push(workoutT)
    //console.log(workoutT) testing
    populateTable()
    localStorage.setItem('myWorkouts', JSON.stringify(myWorkouts))
    document.getElementById('date').value = ''
    document.getElementById('workout').value = ''
    document.getElementById('distance').value = ''
}
function handleDeleteWorkout(uuid) {
    //console.log("delete ran", date) //test
    myWorkouts=myWorkouts.filter(workout => workout.ID != uuid)
    localStorage.setItem('myWorkouts', JSON.stringify(myWorkouts))
    populateTable()
}
function handlePin(uuid) {
    // console.log("edit function ran")
    myWorkouts.forEach(function(workout) {
        if(workout.ID == uuid)
            workout.Pin = !workout.Pin
    })
    localStorage.setItem('myWorkouts', JSON.stringify(myWorkouts))
    populateTable()
}


//UUIDs
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}