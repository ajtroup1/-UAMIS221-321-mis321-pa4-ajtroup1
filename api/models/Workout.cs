namespace _UAMIS221_321_mis321_pa4_ajtroup1.api.models
{
    public class Workout
    {
        public int id {get; set;}
        public string name {get; set;}
        public DateTime date {get; set;}
        public double distance {get; set;}
        public bool pinned {get; set;}
        public bool deleted {get; set;}
    }
}