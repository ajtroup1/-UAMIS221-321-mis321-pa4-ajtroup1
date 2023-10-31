using System.Configuration;
using MySql.Data.MySqlClient;
using System.Data.SqlClient;
using Microsoft.CodeAnalysis.Elfie.Diagnostics;


namespace _UAMIS221_321_mis321_pa4_ajtroup1.api.models
{
    public class WorkoutUtility
    {
        public List<Workout> GetAllWorkouts(){
            List<Workout> myWorkouts = new List<Workout>();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = @"SELECT workoutID, workoutName, workoutDate, deleted, workoutDistance, pinned FROM workout";
            using var cmd = new MySqlCommand(stm, con);
            using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Workout workout = new Workout
                        {
                            id = reader.GetInt32("workoutID"),
                            date = reader.GetDateTime("workoutDate"),
                            deleted = reader.GetBoolean("deleted"),
                            distance = reader.GetDouble("workoutDistance"),
                            pinned = reader.GetBoolean("pinned"),
                            name = reader.GetString("workoutName")
                        };
                        myWorkouts.Add(workout);
                    }
                }
            return myWorkouts;
        }
        public void AddWorkout(Workout myWorkout){
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = "INSERT INTO workout (workoutName, workoutDate, workoutDistance) VALUES (@name, @date, @distance)";
            using var cmd = new MySqlCommand(stm, con);
            cmd.Parameters.AddWithValue("@name", myWorkout.name);
            cmd.Parameters.AddWithValue("@date", myWorkout.date);
            cmd.Parameters.AddWithValue("@distance", myWorkout.distance);
            cmd.ExecuteNonQuery();
        }
        public void DeleteWorkout(int id){
            List<Workout> myWorkouts = new List<Workout>();
            myWorkouts = GetAllWorkouts();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            string stm = $"UPDATE workout SET deleted = true WHERE workoutID={id}";
            using var cmd = new MySqlCommand(stm, con);
            cmd.ExecuteNonQuery();
        }
        public void PinWorkout(int id)
        {
            List<Workout> myWorkouts = new List<Workout>();
            myWorkouts = GetAllWorkouts();
            ConnectionString myConnection = new ConnectionString();
            string cs = myConnection.cs;
            using var con = new MySqlConnection(cs);
            con.Open();

            bool currentPinnedStatus = myWorkouts.FirstOrDefault(workout => workout.id == id)?.pinned ?? false;

            bool newPinnedStatus = !currentPinnedStatus;

            string stm = $"UPDATE workout SET pinned = {newPinnedStatus} WHERE workoutID = {id}";
            using var cmd = new MySqlCommand(stm, con);
            cmd.ExecuteNonQuery();
        }


    }
    
}