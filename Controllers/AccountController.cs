using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Data.SqlClient;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Digital_Academy.Models;

namespace Digital_Academy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AccountController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginPage login)
        {
            LoggedInUser loggedInUser = new LoggedInUser();
            try
            {
                using (SqlConnection conn = new SqlConnection(_configuration["ConnectionString:DefaultConnection"]))
                {
                    DataTable dataTable = new DataTable();
                    SqlCommand cmd = new SqlCommand("spLoginPage", conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", login.UserName);
                    cmd.Parameters.AddWithValue("@UserPassword", login.UserPassword);
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(dataTable);
                    if (dataTable.Rows.Count > 0)
                    {
                        loggedInUser.UserId = Convert.ToInt32(dataTable.Rows[0]["UserId"]);
                        //loggedInUser.ProfileId = Convert.ToInt32(dataTable.Rows[0]["ProfileId"]);

                        var authClaims = new List<Claim>
                        {
                            new Claim(ClaimTypes.Name, login.UserName),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        };

                        authClaims.Add(new Claim(ClaimTypes.NameIdentifier, loggedInUser.UserId.ToString()));
                        var token = GetToken(authClaims);

                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            loggedInUser = loggedInUser
                        });
                    }

                    return Unauthorized();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
    }
}
