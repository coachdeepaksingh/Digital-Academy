namespace Digital_Academy.Models
{
    public class Blogs
    {
        public int BlogId { get; set; }
        public string? BlogTitle { get; set;}
        public string? ShortIntro { get; set;} = null;
        public string? BlogDesc { get; set;}
        public string? BlogWriter { get;set;}
        public string? BlogDate { get; set; }
        public int BlogCategory {  get; set;}
        public string? CatName { get; set;}
        public string? BlogBanner { get; set;}
        public int UserId { get; set;}

    }
}
