using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Reflection.Metadata.Ecma335;

namespace Digital_Academy.Controllers
{
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UploadController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [Route("Upload")]
        [HttpPost]
        public IActionResult Upload(int id, string module, IFormFile file)
        {
            try
            {
                string? fileName = null;

                if (module == "user")

                {
                    fileName = id.ToString() + "_" + module + "_profile" + Path.GetExtension(file.FileName);
                }
                else if (module == "topic")
                {
                    fileName = id.ToString() + "_" + module + "_content" + Path.GetExtension(file.FileName);
                }
                else if (module == "ebook")
                {
                    fileName = id.ToString() + "_" + module + "cover" + Path.GetExtension(file.FileName);
                }
                else if (module == "ebookPdf")
                {
                    fileName = id.ToString() + "_" + module + "Page" + Path.GetExtension(file.FileName);
                }
                else if (module == "address")
                {
                    fileName = id.ToString() + "_" + module + "Proof" + Path.GetExtension(file.FileName);
                }
                else if (module == "id")
                {
                    fileName = id.ToString() + "_" + module + "Proof" + Path.GetExtension(file.FileName);
                }
                else  if (module == "blog" || module == "course" || module == "event")
                {
                    fileName = id.ToString() + "_" + module + "_banner" + Path.GetExtension(file.FileName);
                }

                string uploads = "D:\\NEXTPROJ\\DIGITALACADEMY\\digitalacademy\\public\\uploads";
                if (file.Length > 0)
                {
                    string filePath = Path.Combine(uploads, fileName);
                    using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyToAsync(fileStream);
                    }

                    UpdateFileName(id, fileName, module);
                }

                return Ok(fileName);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private bool UpdateFileName(int id, string fileName, string module)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateFileName", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@id", id);
                cmd.Parameters.AddWithValue("@module", module);
                cmd.Parameters.AddWithValue("@filename", fileName);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

