namespace _UAMIS221_321_mis321_pa4_ajtroup1
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString(){
            string server = "jtb9ia3h1pgevwb1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "jpb57x6h5gegw8a3";
            string username = "ef6vcp24n9a38ffn";
            string password = "fsd2u6a59m2x102g";
            string port = "3306";
            
            cs = $"server={server};user={username};database={database};port={port};password={password}";
        }
    }
}