namespace Digital_Academy.Models
{
    public class Profile
    {
        public int ProfileId { get; set; }
        public string? ProfileName { get; set; }
        public string? FatherName { get; set; }
        public string? DateofBirth { get; set; }
        public string? ShortIntro { get; set; }
        public string? EduCation { get; set; }
        public string? ProFession { get; set; }
        public string? AddRess { get; set;}
        public string? IdProof { get; set; }
        public string? AddProof { get; set; }
        public int UserId {  get; set; }
        public int UserTypeId { get; set; }
        public string? AboutMe { get; set; }
        public string? UserType { get; set; }
        public string? ProfileImage {  get; set; }
    }
}
