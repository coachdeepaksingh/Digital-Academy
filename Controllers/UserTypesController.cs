using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserTypesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserTypesController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllUserTypes")]
        [HttpGet]
        public IActionResult GetAllUserTypes()
        {
            List<UserTypes> uTypList = new List<UserTypes>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllUserTypes", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                UserTypes uTyp = new UserTypes();
                uTyp.userTypeId = Convert.ToInt32(dr["userTypeId"]);
                uTyp.userType = Convert.ToString(dr["userType"]);
                uTypList.Add(uTyp);
            }
            return Ok(uTypList);
        }
    }
}
