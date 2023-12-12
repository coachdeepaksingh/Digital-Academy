namespace Digital_Academy.Models
{
    public class Courses
    {
        public int CourseId { get; set; }
        public string? CourseTitle { get; set; }
        public string? ShortIntro { get; set; }
        public string? CourseDesc { get; set; }
        public int CourseCategory {  get; set; }
        public string? CatName { get; set; }    
        public double? OrigPrice { get; set; }
        public double? DiscPrice { get; set; }
        public int UserId {  get; set; }
        public string? CourseValid { get; set;}
        public string? CourseBanner { get; set; }
    }
}
