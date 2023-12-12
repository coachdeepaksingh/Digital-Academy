namespace Digital_Academy.Models
{
    public class LoginPage
    {
        public string? UserName { get; set; }
        public string? UserPassword { get; set; } = null;
    }

    public class LoggedInUser
    {
        public int UserId { get; set; }
        public int ProfileId { get; set; }
    }
}
