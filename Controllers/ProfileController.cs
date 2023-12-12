using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProfileController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllProfiles")]
        [HttpGet]
        public IActionResult GetAllProfiles()
        {
            List<Profile> pfllist = new List<Profile>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllProfiles", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Profile pfl = new Profile();
                pfl.ProfileId = Convert.ToInt32(dr["ProfileId"]);
                pfl.UserTypeId = Convert.ToInt32(dr["UserTypeId"]);
                pfl.UserType = Convert.ToString(dr["UserType"]);
                pfl.UserId = Convert.ToInt32(dr["UserId"]);
                pfl.ProfileName = Convert.ToString(dr["ProfileName"]);
                pfl.FatherName = Convert.ToString(dr["FatherName"]);
                pfl.DateofBirth = Convert.ToString(dr["DateofBirth"]);
                pfl.EduCation = Convert.ToString(dr["EduCation"]);
                pfl.ProFession = Convert.ToString(dr["ProFession"]);
                pfl.AboutMe = Convert.ToString(dr["AboutMe"]);
                pfl.AddRess = Convert.ToString(dr["AddRess"]);
                pfl.AddProof = Convert.ToString(dr["AddProof"]);
                pfl.IdProof = Convert.ToString(dr["IdProof"]);
                pfl.ProfileImage = Convert.ToString(dr["ProfileImage"]);
                pfllist.Add(pfl);
            }
            return Ok(pfllist);
        }
        [Route("AddProfile")]
        [HttpPost]
        public IActionResult AddProfile(Profile Profile)
        {
            try
            {
                int ProfileId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddProfile", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ProfileName", Profile.ProfileName);
                    cmd.Parameters.AddWithValue("@FatherName", Profile.FatherName);
                    cmd.Parameters.AddWithValue("@DateofBirth", Profile.DateofBirth);
                    cmd.Parameters.AddWithValue("@EduCation", Profile.EduCation);
                    cmd.Parameters.AddWithValue("@ProFession", Profile.ProFession);
                    cmd.Parameters.AddWithValue("@AboutMe", Profile.AboutMe);
                    cmd.Parameters.AddWithValue("@AddRess", Profile.AddRess);
                    cmd.Parameters.AddWithValue("@AddProof", Profile.AddProof);
                    cmd.Parameters.AddWithValue("@IdProof", Profile.IdProof);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();

                }
                return Ok(ProfileId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetProfileById")]
        [HttpGet]
        public IActionResult GetProfileById(int Id)
        {
            Profile pfl = new Profile();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetProfileById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@ProfileId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                pfl.ProfileId = Convert.ToInt32(dr["ProfileId"]);
                pfl.ProfileName = Convert.ToString(dr["ProfileName"]);
                pfl.FatherName = Convert.ToString(dr["FatherName"]);
                pfl.DateofBirth = Convert.ToDateTime(dr["DateofBirth"]).ToString("yyyy-MM-dd");
                pfl.EduCation = Convert.ToString(dr["EduCation"]);
                pfl.ProFession = Convert.ToString(dr["ProFession"]);
                pfl.AboutMe = Convert.ToString(dr["AboutMe"]);
                pfl.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                pfl.UserTypeId = Convert.ToInt32(dr["UserTypeId"]);
                pfl.AddRess = Convert.ToString(dr["AddRess"]);
                pfl.AddProof = Convert.ToString(dr["AddProof"]);
                pfl.IdProof = Convert.ToString(dr["IdProof"]);
                pfl.ProfileImage = Convert.ToString(dr["ProfileImage"]);
            }
            return Ok(pfl);
        }
        [Route("UpdateProfile")]
        [HttpPut]
        public IActionResult UpdateProfile(Profile Profile)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateProfile", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProfileId", Profile.ProfileId);
                cmd.Parameters.AddWithValue("@ProfileName", Profile.ProfileName);
                cmd.Parameters.AddWithValue("@FatherName", Profile.FatherName);
                cmd.Parameters.AddWithValue("@ShortIntro", Profile.ShortIntro);
                cmd.Parameters.AddWithValue("@DateofBirth", Profile.DateofBirth);
                cmd.Parameters.AddWithValue("@EduCation", Profile.EduCation);
                cmd.Parameters.AddWithValue("@ProFession", Profile.ProFession);
                cmd.Parameters.AddWithValue("@AddRess", Profile.AddRess);
                cmd.Parameters.AddWithValue("@AddProof", Profile.AddProof);
                cmd.Parameters.AddWithValue("@IdProof", Profile.IdProof);
                cmd.Parameters.AddWithValue("@AboutMe", Profile.AboutMe);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(Profile);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteProfile")]
        [HttpDelete]
        public IActionResult DeleteProfile(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteProfile", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ProfileId", Id);
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
