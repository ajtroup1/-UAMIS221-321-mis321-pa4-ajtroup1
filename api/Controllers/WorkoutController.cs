using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Threading.Tasks;
using _UAMIS221_321_mis321_pa4_ajtroup1.api.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _UAMIS221_321_mis321_pa4_ajtroup1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        // GET: api/Workout
        [HttpGet]
        public List<Workout> Get()
        {
            WorkoutUtility utility = new WorkoutUtility();
            return utility.GetAllWorkouts();
        }

        // GET: api/Workout/5
        [HttpGet("{id}", Name = "Get")]
        public Workout Get(int id)
        {
            WorkoutUtility utility = new WorkoutUtility();
            List<Workout> myWorkouts = new List<Workout>();
            myWorkouts = utility.GetAllWorkouts();
            foreach(Workout myWorkout in myWorkouts){
                if(myWorkout.id==id)
                    return myWorkout;
            }
            return new Workout();
        }

        // POST: api/Workout
        [HttpPost]
        public void Post([FromBody] Workout value)
        {
            WorkoutUtility util = new WorkoutUtility();
            util.AddWorkout(value);
        }

        // PUT: api/Workout/5
        [HttpPut("{id}")]
        public void Put(int id)
        {
            WorkoutUtility util = new WorkoutUtility();
            util.DeleteWorkout(id);
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            WorkoutUtility util = new WorkoutUtility();
            util.DeleteWorkout(id);
     
        }
        [HttpPut("pinned/{id}")]
        public void PutField2(int id)
        {
            WorkoutUtility util = new WorkoutUtility();
            util.PinWorkout(id);
        }
    }
}
