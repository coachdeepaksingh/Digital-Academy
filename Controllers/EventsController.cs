using Digital_Academy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EventsController(IConfiguration configuration)
        {

            _configuration = configuration;

        }
        [Route("GetAllEvents")]
        [HttpGet]
        public IActionResult GetAllEvents()
        {
            List<Events> evtlist = new List<Events>();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetAllEvents", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                Events evt = new Events();
                evt.EventId = Convert.ToInt32(dr["EventId"]);
                evt.EventCategory = Convert.ToInt32(dr["EventCategory"]);
                evt.CatName = Convert.ToString(dr["CatName"]);
                evt.EventTitle = Convert.ToString(dr["EventTitle"]);
                evt.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                evt.EventDesc = Convert.ToString(dr["EventDesc"]);
                evt.EventDate = Convert.ToString(dr["EventDate"]);
                evt.EventTime = Convert.ToString(dr["EventTime"]);
                evt.EventMode = Convert.ToString(dr["EventMode"]);
                evt.EventLocation = Convert.ToString(dr["EventLocation"]);
                evt.ContactPerson = Convert.ToString(dr["ContactPerson"]);
                evt.ContactNumber = Convert.ToString(dr["ContactNumber"]);

                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    evt.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    evt.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }

                evt.EventBanner = Convert.ToString(dr["EventBanner"]);
                evtlist.Add(evt);
            }
            return Ok(evtlist);
        }
        [Route("AddEvent")]
        [HttpPost]
        public IActionResult AddEvent(Events evnt)
        {
            try
            {
                int EventId = 0;
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    SqlCommand cmd = new SqlCommand("spAddEvent", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@EventTitle", evnt.EventTitle);
                    cmd.Parameters.AddWithValue("@ShortIntro", evnt.ShortIntro);
                    cmd.Parameters.AddWithValue("@EventDesc", evnt.EventDesc);
                    cmd.Parameters.AddWithValue("@ContactPerson", evnt.ContactPerson);
                    cmd.Parameters.AddWithValue("@ContactNumber", evnt.ContactNumber);
                    cmd.Parameters.AddWithValue("@DiscPrice", evnt.DiscPrice);
                    cmd.Parameters.AddWithValue("@OrigPrice", evnt.OrigPrice);
                    cmd.Parameters.AddWithValue("@EventDate", evnt.EventDate);
                    cmd.Parameters.AddWithValue("@EventMode", evnt.EventMode);
                    cmd.Parameters.AddWithValue("@EventLocation", evnt.EventLocation);
                    cmd.Parameters.AddWithValue("@EventTime", evnt.EventTime);
                    cmd.Parameters.AddWithValue("@EventCategory", evnt.EventCategory);
                    conn.Open();
                    int i = cmd.ExecuteNonQuery();
                    conn.Close();
                }
                return Ok(EventId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [Route("GetEventById")]
        [HttpGet]
        public IActionResult GetEventById(int Id)
        {
            Events evt = new Events();
            DataTable dt = new DataTable();
            SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
            SqlCommand cmd = new SqlCommand("spGetEventById", conn);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@EventId", Id);
            SqlDataAdapter adapter = new SqlDataAdapter(cmd);
            adapter.Fill(dt);
            foreach (DataRow dr in dt.Rows)
            {
                evt.EventId = Convert.ToInt32(dr["EventId"]);
                evt.EventCategory = Convert.ToInt32(dr["EventCategory"]);
                evt.EventTitle = Convert.ToString(dr["EventTitle"]);
                evt.ShortIntro = Convert.ToString(dr["ShortIntro"]);
                evt.EventDesc = Convert.ToString(dr["EventDesc"]);
                evt.EventDate = Convert.ToDateTime(dr["EventDate"]).ToString("yyyy-MM-dd");
                evt.EventTime = Convert.ToString(dr["EventTime"]);
                evt.EventMode = Convert.ToString(dr["EventMode"]);
                evt.EventLocation = Convert.ToString(dr["EventLocation"]);
                evt.EventBanner = Convert.ToString(dr["EventBanner"]);
                evt.ContactPerson = Convert.ToString(dr["ContactPerson"]);
                evt.ContactNumber = Convert.ToString(dr["ContactNumber"]);

                if (!Convert.IsDBNull(dr["DiscPrice"]))
                {
                    evt.DiscPrice = Convert.ToDouble(dr["DiscPrice"]);
                }
                if (!Convert.IsDBNull(dr["OrigPrice"]))
                {
                    evt.OrigPrice = Convert.ToDouble(dr["OrigPrice"]);
                }

                evt.EventBanner = Convert.ToString(dr["EventBanner"]);
            }
            return Ok(evt);
        }
        [Route("UpdateEvent")]
        [HttpPut]
        public IActionResult UpdateEvent(Events evnt)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spUpdateEvent", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EventId", evnt.EventId);
                cmd.Parameters.AddWithValue("@EventTitle", evnt.EventTitle);
                cmd.Parameters.AddWithValue("@ShortIntro", evnt.ShortIntro);
                cmd.Parameters.AddWithValue("@EventDesc", evnt.EventDesc);
                cmd.Parameters.AddWithValue("@ContactPerson", evnt.ContactPerson);
                cmd.Parameters.AddWithValue("@ContactNumber", evnt.ContactNumber);
                cmd.Parameters.AddWithValue("@DiscPrice", evnt.DiscPrice);
                cmd.Parameters.AddWithValue("@OrigPrice", evnt.OrigPrice);
                cmd.Parameters.AddWithValue("@EventDate", evnt.EventDate);
                cmd.Parameters.AddWithValue("@EventTime", evnt.EventTime);
                cmd.Parameters.AddWithValue("@EventMode", evnt.EventMode);
                cmd.Parameters.AddWithValue("@EventLocation", evnt.EventLocation);
                cmd.Parameters.AddWithValue("@EventCategory", evnt.EventCategory);
                conn.Open();
                int i = cmd.ExecuteNonQuery();
                conn.Close();
                return Ok(evnt);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("DeleteEvent")]
        [HttpDelete]
        public IActionResult DeleteEvent(int Id)
        {
            try
            {
                SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]);
                SqlCommand cmd = new SqlCommand("spDeleteEvent", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@EventId", Id);
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
