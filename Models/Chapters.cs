namespace Digital_Academy.Models
{
    public class Chapters
    {
        public int ChapId { get; set; }
        public string? ChapTitle { get; set;}
        public int CourseId { get; set; }
    }

    public class ChapterAndTopics:Chapters
    {
        public List<Topics> Topics { get; set; }
    }
}
