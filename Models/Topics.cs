namespace Digital_Academy.Models
{
    public class Topics
    {
        public int TopId { get; set; }
        public string? TopTitle { get; set; } 
        public string? TopContent { get; set;}
        public string? UrlPath {  get; set; }
        public int ChapId {  get; set; }
    }
}
