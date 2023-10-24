// used "dotnet add package MySQL.Data" to install 

//using stm
using System.Data;
using MySql.Data;
using MySql.Data.MySqlClient;

//establish sql connection
string cs = @"server=; user=; database=; port=; password=";
MySqlConnection con = new MySqlConnection(cs);
