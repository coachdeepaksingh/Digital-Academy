using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {

            _configuration = configuration;

        }

        [Route("GetAllUsers")]
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            List<Users> usrlist = new List<Users>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllUsers", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);

            foreach (DataRow dr in dt.Rows)
            {
                Users usr = new Users();
                usr.UserId = Convert.ToInt32(dr["UserId"]);
                usr.UserName = Convert.ToString(dr["UserName"]);
                usr.UserPassword = Convert.ToString(dr["UserPassword"]);
                usr.UserEmail = Convert.ToString(dr["UserEmail"]);
                usr.UserPhone = Convert.ToString(dr["UserPhone"]);
                usr.UserTypeId = Convert.ToInt32(dr["UserTypeId"]);
                usr.UserType = Convert.ToString(dr["UserType"]);
                usrlist.Add(usr);
            }
            return Ok(usrlist);
        }

        [Route("AddUser")]
        [HttpPost]
        public IActionResult AddUser(Users usr)
        {
            try
            {
                int UserId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {

                    SqlCommand cmd = new SqlCommand("spAddUser", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", usr.UserName);
                    cmd.Parameters.AddWithValue("@UserPassword", usr.UserPassword);
                    cmd.Parameters.AddWithValue("@UserEmail", usr.UserEmail);
                    cmd.Parameters.AddWithValue("@UserPhone", usr.UserPhone);
                    cmd.Parameters.AddWithValue("@UserTypeId", usr.UserTypeId);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                }
                return Ok(UserId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetUserById")]
        [HttpGet]
        public IActionResult GetUserById(int Id)
        {
            Users usr = new Users();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetUserById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@UserId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                usr.UserId = Convert.ToInt32(dr["UserId"]);
                usr.UserName = Convert.ToString(dr["UserName"]);
                usr.UserPassword = Convert.ToString(dr["UserPassword"]);
                usr.UserEmail = Convert.ToString(dr["UserEmail"]);
                usr.UserPhone = Convert.ToString(dr["UserPhone"]);
                usr.UserTypeId = Convert.ToInt32(dr["UserTypeId"]);
            }
            return Ok(usr);
        }
        [Route("UpdateUser")]
        [HttpPut]
        public IActionResult UpdateUser(Users usr)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", usr.UserId);
                cmd.Parameters.AddWithValue("@UserName", usr.UserName);
                cmd.Parameters.AddWithValue("@UserPassword", usr.UserPassword);
                cmd.Parameters.AddWithValue("@UserEmail", usr.UserEmail);
                cmd.Parameters.AddWithValue("@UserPhone", usr.UserPhone);
                cmd.Parameters.AddWithValue("@UserTypeId", usr.UserTypeId);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(usr);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("DeleteUser")]
        [HttpDelete]
        public IActionResult DeleteUser(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteUser", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@UserId", Id);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(Id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
