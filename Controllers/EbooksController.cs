using Digital_Academy.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EbooksController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EbooksController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllEbooks")]
        [HttpGet]
        public IActionResult GetAllEbooks()
        {
            List<Ebooks> ebklist = new List<Ebooks>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllEbooks", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Ebooks ebk = new Ebooks();
                ebk.EbookId = Convert.ToInt32(dr["EbookId"]);
                ebk.EbookCategory = Convert.ToInt32(dr["EbookCategory"]);
                ebk.CatName = Convert.ToString(dr["CatName"]);
                ebk.EbookTitle = Convert.ToString(dr["EbookTitle"]);
                ebk.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                ebk.EbookDescription = Convert.ToString(dr["EbookDescription"]);
                ebk.AuthorName = Convert.ToString(dr["AuthorName"]);
                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    ebk.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    ebk.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }
                ebk.EbookImage = Convert.ToString(dr["EbookImage"]);
                ebk.EbookPdf = Convert.ToString(dr["EbookPdf"]);
                ebklist.Add(ebk);
            }
            return Ok(ebklist);
        }
        [Route("AddEbook")]
        [HttpPost]
        public IActionResult AddEbook(Ebooks ebook)
        {
            try
            {
                int EbookId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                        SqlCommand cmd = new SqlCommand("spAddEbook", conn);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@EbookTitle", ebook.EbookTitle);
                        cmd.Parameters.AddWithValue("@ShortIntro", ebook.ShortIntro);
                        cmd.Parameters.AddWithValue("@EbookDescription", ebook.EbookDescription);
                        cmd.Parameters.AddWithValue("@AuthorName", ebook.AuthorName);
                        cmd.Parameters.AddWithValue("@DiscPrice", ebook.DiscPrice);
                        cmd.Parameters.AddWithValue("@OrigPrice", ebook.OrigPrice);
                        cmd.Parameters.AddWithValue("@EbookCategory", ebook.EbookCategory);
                        conn.Open();
                        int i = cmd.ExecuteNonQuery();
                        conn.Close();
                    
                }
                return Ok(EbookId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetEbookById")]
        [HttpGet]
        public IActionResult GetEbookById(int Id)
        {
            Ebooks ebk = new Ebooks();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetEbookById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EbookId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                ebk.EbookId = Convert.ToInt32(dr["EbookId"]);
                ebk.EbookCategory = Convert.ToInt32(dr["EbookCategory"]);
                ebk.EbookTitle = Convert.ToString(dr["EbookTitle"]);
                ebk.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                ebk.EbookDescription = Convert.ToString(dr["EbookDescription"]);
                ebk.AuthorName = Convert.ToString(dr["AuthorName"]);
                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    ebk.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    ebk.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }
                ebk.EbookImage = Convert.ToString(dr["EbookImage"]);
                ebk.EbookPdf = Convert.ToString(dr["EbookPdf"]);
            }
            return Ok(ebk);
        }
        [Route("UpdateEbook")]
        [HttpPut]
        public IActionResult UpdateEbook(Ebooks ebook)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateEbook", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EbookId", ebook.EbookId);
                cmd.Parameters.AddWithValue("@EbookTitle", ebook.EbookTitle);
                cmd.Parameters.AddWithValue("@ShortIntro", ebook.ShortIntro);
                cmd.Parameters.AddWithValue("@EbookDescription", ebook.EbookDescription);
                cmd.Parameters.AddWithValue("@AuthorName", ebook.AuthorName);
                cmd.Parameters.AddWithValue("@DiscPrice", ebook.DiscPrice);
                cmd.Parameters.AddWithValue("@OrigPrice", ebook.OrigPrice);
                cmd.Parameters.AddWithValue("@EbookCategory", ebook.EbookCategory);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(ebook);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteEbook")]
        [HttpDelete]
        public IActionResult DeleteEbook(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteEbook", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EbookId", Id);
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
