using Microsoft.AspNetCore.Mvc;
using Digital_Academy.Models;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public CategoryController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllCategory")]
        [HttpGet]
        public IActionResult GetAllCategory()
        {
            List<Category> ctr = new List<Category>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllCategory", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Category ctrItem = new Category();
                ctrItem.CatId = Convert.ToInt32(dr["CatId"]);
                ctrItem.CatName = Convert.ToString(dr["CatName"]);
                //ctrItem.CreatedDate = Convert.ToString(dr["CreatedDate"]);
                ctr.Add(ctrItem);
            }
            return Ok(ctr);
        }
        [Route("AddCategory")]
        [HttpPost]
        public IActionResult AddCategory(Category cat)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    
                    SqlCommand cmd = new SqlCommand("spAddCategory", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@CatName", cat.CatName);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();
                    
                }
                return Ok(cat);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("CategoryById")]
        [HttpGet]
        public IActionResult CategoryById(int Id)
        {
            Category ctr = new Category();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spCategoryById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@CatId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                ctr.CatId = Convert.ToInt32(dr["CatId"]);
                ctr.CatName = Convert.ToString(dr["CatName"]);
            }
            return Ok(ctr);
        }
        [Route("UpdateCategory")]
        [HttpPut]
        public IActionResult UpdateCategory(Category cat)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateCategory", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CatId", cat.CatId);
                cmd.Parameters.AddWithValue("@CatName", cat.CatName);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(cat);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteCategory")]
        [HttpDelete]
        public IActionResult DeleteCategory(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteCategory", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@CatId", Id);
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
