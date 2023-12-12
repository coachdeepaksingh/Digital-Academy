using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public BlogController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllBlogs")]
        [HttpGet]
        public IActionResult GetAllBlogs()
        {
            List<Blogs> blglist = new List<Blogs>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllBlogs", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Blogs blg = new Blogs();
                blg.BlogId = Convert.ToInt32(dr["BlogId"]);
                blg.BlogCategory = Convert.ToInt32(dr["BlogCategory"]);
                blg.CatName = Convert.ToString(dr["CatName"]);
                blg.BlogTitle = Convert.ToString(dr["BlogTitle"]);
                blg.BlogDate = Convert.ToString(dr["BlogDate"]);
                blg.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                blg.BlogDesc = Convert.ToString(dr["BlogDesc"]);
                blg.BlogWriter = Convert.ToString(dr["BlogWriter"]);
                blg.BlogBanner = Convert.ToString(dr["BlogBanner"]);
                blglist.Add(blg);
            }
            return Ok(blglist);
        }
        [Route("AddBlog")]
        [HttpPost]
        public IActionResult AddBlog(Blogs blg)
        {
            try
            {
                int BlogId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddBlog", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BlogTitle", blg.BlogTitle);
                    cmd.Parameters.AddWithValue("@ShortIntro", blg.ShortIntro);
                    cmd.Parameters.AddWithValue("@BlogDesc", blg.BlogDesc);
                    cmd.Parameters.AddWithValue("@BlogWriter", blg.BlogWriter);
                    cmd.Parameters.AddWithValue("@BlogCategory", blg.BlogCategory);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                }
                return Ok(BlogId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetBlogById")]
        [HttpGet]
        public IActionResult GetBlogById(int Id)
        {
            Blogs blg = new Blogs();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetBlogById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@BlogId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                blg.BlogId = Convert.ToInt32(dr["BlogId"]);
                blg.BlogCategory = Convert.ToInt32(dr["BlogCategory"]);
                blg.BlogTitle = Convert.ToString(dr["BlogTitle"]);
                blg.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                blg.BlogDesc = Convert.ToString(dr["BlogDesc"]);
                blg.BlogWriter = Convert.ToString(dr["BlogWriter"]);
                blg.BlogBanner = Convert.ToString(dr["BlogBanner"]);
            }
            return Ok(blg);
        }
        [Route("UpdateBlog")]
        [HttpPut]
        public IActionResult UpdateBlog(Blogs Blog)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateBlog", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BlogId", Blog.BlogId);
                cmd.Parameters.AddWithValue("@BlogTitle", Blog.BlogTitle);
                cmd.Parameters.AddWithValue("@ShortIntro", Blog.ShortIntro);
                cmd.Parameters.AddWithValue("@BlogDesc", Blog.BlogDesc);
                cmd.Parameters.AddWithValue("@BlogWriter", Blog.BlogWriter);
                cmd.Parameters.AddWithValue("@BlogBanner", Blog.BlogBanner);
                cmd.Parameters.AddWithValue("@BlogCategory", Blog.BlogCategory);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(Blog);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteBlog")]
        [HttpDelete]
        public IActionResult DeleteBlog(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteBlog", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@BlogId", Id);
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
