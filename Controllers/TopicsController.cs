using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public TopicsController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllTopics")]
        [HttpGet]
        public IActionResult GetAllTopics(int ChapId)
        {
            List<Topics> toplist = new List<Topics>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllTopics", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ChapId", ChapId);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Topics top = new Topics();
                top.TopId = Convert.ToInt32(dr["TopId"]);
                top.ChapId = Convert.ToInt32(dr["ChapId"]);
                top.TopTitle = Convert.ToString(dr["TopTitle"]);
                top.UrlPath = Convert.ToString(dr["UrlPath"]);
                top.TopContent = Convert.ToString(dr["TopContent"]);
                toplist.Add(top);
            }
            return Ok(toplist);
        }
        [Route("AddTopic")]
        [HttpPost]
        public IActionResult AddTopic(Topics top)
        {
            try
            {
                int TopId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddTopic", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TopTitle", top.TopTitle);
                    cmd.Parameters.AddWithValue("@ChapId", top.ChapId);
                    cmd.Parameters.AddWithValue("@TopContent", top.TopContent);
                    cmd.Parameters.AddWithValue("@UrlPath", top.UrlPath);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return Ok(TopId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("GetTopicById")]
        [HttpGet]
        public IActionResult GetTopicById(int Id)
        {
            Topics top = new Topics();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetTopicById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@TopId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                top.TopId = Convert.ToInt32(dr["TopId"]);
                top.ChapId = Convert.ToInt32(dr["ChapId"]);
                top.TopTitle = Convert.ToString(dr["TopTitle"]);
                top.UrlPath = Convert.ToString(dr["UrlPath"]);
                top.TopContent = Convert.ToString(dr["TopContent"]);
            }
            return Ok(top);
        }

        [Route("UpdateTopic")]
        [HttpPut]
        public IActionResult UpdateTopic(Topics top)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateTopic", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TopId", top.TopId);
                cmd.Parameters.AddWithValue("@TopTitle", top.TopTitle);
                cmd.Parameters.AddWithValue("@ChapId", top.ChapId);
                cmd.Parameters.AddWithValue("@TopContent", top.TopContent);
                cmd.Parameters.AddWithValue("@UrlPath", top.UrlPath);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(top);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteTopic")]
        [HttpDelete]
        public IActionResult DeleteTopic(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteTopic", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@TopId", Id);
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

        [Route("GetAllChaptersAndTopics")]
        [HttpGet]
        public IActionResult GetAllChaptersAndTopics(int courseId, int ChapId)
        {
            List<ChapterAndTopics> chapAndToplist = new List<ChapterAndTopics>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllChapters", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CourseId", courseId);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                ChapterAndTopics chap = new ChapterAndTopics();
                chap.ChapId = Convert.ToInt32(dr["ChapId"]);
                chap.CourseId = Convert.ToInt32(dr["CourseId"]);
                chap.ChapTitle = Convert.ToString(dr["ChapTitle"]);
                chapAndToplist.Add(chap);
            }

            if (chapAndToplist.Count > 0)
            {
                foreach(var chapter in chapAndToplist)
                {
                    chapter.Topics = new List<Topics>();
                    dt = new DataTable();
                    conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                    cmd = new SqlCommand("spGetAllTopics", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ChapId", chapter.ChapId);
                    adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(dt);

                    foreach (DataRow dr in dt.Rows)
                    {
                        Topics top = new Topics();
                        top.TopId = Convert.ToInt32(dr["TopId"]);
                        top.ChapId = Convert.ToInt32(dr["ChapId"]);
                        top.TopTitle = Convert.ToString(dr["TopTitle"]);
                        top.UrlPath = Convert.ToString(dr["UrlPath"]);
                        top.TopContent = Convert.ToString(dr["TopContent"]);
                        chapter.Topics.Add(top);
                    }
                }
            }
             return Ok(chapAndToplist);
        }
    }
}
