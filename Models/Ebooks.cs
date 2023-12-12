namespace Digital_Academy.Models
{
    public class Ebooks
    {
        public int EbookId { get; set; }
        public string? EbookTitle { get; set;}
        public string? ShortIntro { get; set; } = string.Empty;
        public string? EbookDescription { get; set;} = string.Empty;
        public int EbookCategory {  get; set; }
        public string? CatName {  get; set; }
        public int UserId { get; set; }  
        public string? AuthorName { get; set; } = string.Empty;
        public double? DiscPrice { get; set; }
        public double? OrigPrice { get; set; }
        public string? EbookImage { get; set; } = string.Empty;    
        public string? EbookPdf {  get; set; }

    }
}
