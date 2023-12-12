using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChaptersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ChaptersController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllChapters")]
        [HttpGet]
        public IActionResult GetAllChapters(int courseId)
        {
            List<Chapters> chaplist = new List<Chapters>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllChapters", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CourseId", courseId);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Chapters chap = new Chapters();
                chap.ChapId = Convert.ToInt32(dr["ChapId"]);
                chap.CourseId = Convert.ToInt32(dr["CourseId"]);
                chap.ChapTitle = Convert.ToString(dr["ChapTitle"]);
                chaplist.Add(chap);
            }
            return Ok(chaplist);
        }
        [Route("AddChapter")]
        [HttpPost]
        public IActionResult AddChapter(Chapters Chap)
        {
            try
            {
                int ChapId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddChapter", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ChapTitle", Chap.ChapTitle);
                    cmd.Parameters.AddWithValue("@CourseId", Chap.CourseId);
                    conn.Open();
                    ChapId = (int)cmd.ExecuteScalar();
                    conn.Close();

                }
                return Ok(ChapId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetChapterById")]
        [HttpGet]
        public IActionResult GetChapterById(int Id)
        {
            Chapters chap = new Chapters();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetChapterById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ChapId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                chap.ChapId = Convert.ToInt32(dr["ChapId"]);
                chap.ChapTitle = Convert.ToString(dr["ChapTitle"]);
                chap.CourseId = Convert.ToInt32(dr["CourseId"]);
            }
            return Ok(chap);
        }
        [Route("UpdateChapter")]
        [HttpPut]
        public IActionResult UpdateChapter(Chapters Chap)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateChapter", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ChapId", Chap.ChapId);
                cmd.Parameters.AddWithValue("@CourseId", Chap.CourseId);
                cmd.Parameters.AddWithValue("@ChapTitle", Chap.ChapTitle);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(Chap);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteChapter")]
        [HttpDelete]
        public IActionResult DeleteChapter(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteChapter", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ChapId", Id);
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
