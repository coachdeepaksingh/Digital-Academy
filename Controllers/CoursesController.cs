using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CoursesController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllCourses")]
        [HttpGet]
        public IActionResult GetAllCourses()
        {
            List<Courses> corslist = new List<Courses>();
            DataTable dt = new DataTable();

            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllCourses", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Courses cors = new Courses();
                cors.CourseId = Convert.ToInt32(dr["CourseId"]);
                cors.CourseCategory = Convert.ToInt32(dr["CourseCategory"]);
                cors.CatName = Convert.ToString(dr["CatName"]);
                cors.CourseTitle = Convert.ToString(dr["CourseTitle"]);
                cors.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                cors.CourseDesc = Convert.ToString(dr["CourseDesc"]);
                cors.CourseValid = Convert.ToString(dr["CourseValid"]);
                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    cors.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    cors.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }
                cors.CourseBanner = Convert.ToString(dr["CourseBanner"]);
                corslist.Add(cors);
            }
            return Ok(corslist);
        }
        [Route("AddCourse")]
        [HttpPost]
        public IActionResult AddCourse(Courses Course)
        {
            try
            {
                int CourseId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddCourse", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CourseTitle", Course.CourseTitle);
                    cmd.Parameters.AddWithValue("@ShortIntro", Course.ShortIntro);
                    cmd.Parameters.AddWithValue("@CourseDesc", Course.CourseDesc);
                    cmd.Parameters.AddWithValue("@CourseCategory", Course.CourseCategory);
                    cmd.Parameters.AddWithValue("@DiscPrice", Course.DiscPrice);
                    cmd.Parameters.AddWithValue("@OrigPrice", Course.OrigPrice);
                    cmd.Parameters.AddWithValue("@CourseValid", Course.CourseValid);
                    conn.Open();
                    CourseId = (int)cmd.ExecuteScalar();
                    conn.Close();

                }
                return Ok(CourseId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetCourseById")]
        [HttpGet]
        public IActionResult GetCourseById(int Id)
        {
            Courses cors = new Courses();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetCourseById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CourseId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                cors.CourseId = Convert.ToInt32(dr["CourseId"]);
                cors.CourseCategory = Convert.ToInt32(dr["CourseCategory"]);
                cors.CourseTitle = Convert.ToString(dr["CourseTitle"]);
                cors.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                cors.CourseDesc = Convert.ToString(dr["CourseDescription"]);
                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    cors.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    cors.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }
                cors.CourseBanner = Convert.ToString(dr["CourseBanner"]);
            }
            return Ok(cors);
        }
        [Route("UpdateCourse")]
        [HttpPut]
        public IActionResult UpdateCourse(Courses Course)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CourseId", Course.CourseId);
                cmd.Parameters.AddWithValue("@CourseTitle", Course.CourseTitle);
                cmd.Parameters.AddWithValue("@ShortIntro", Course.ShortIntro);
                cmd.Parameters.AddWithValue("@CourseDesc", Course.CourseDesc);
                cmd.Parameters.AddWithValue("@DiscPrice", Course.DiscPrice);
                cmd.Parameters.AddWithValue("@OrigPrice", Course.OrigPrice);
                cmd.Parameters.AddWithValue("@CourseBanner", Course.CourseBanner);
                cmd.Parameters.AddWithValue("@CourseCategory", Course.CourseCategory);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(Course);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteCourse")]
        [HttpDelete]
        public IActionResult DeleteCourse(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteCourse", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CourseId", Id);
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
