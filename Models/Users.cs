namespace Digital_Academy.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public string? UserName { get; set; } = string.Empty;
        public string? UserEmail { get; set; } = string.Empty;
        public string? UserPassword { get; set; } 
        public int UserTypeId { get; set; }
        public string? UserType { get; set; }
        public string? UserPhone { get; set; }
    }
}
