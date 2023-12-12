namespace Digital_Academy.Models
{
    public class Events
    {
        public int EventId { get; set; }
        public string? EventTitle { get; set; }
        public string? ShortIntro { get; set; }
        public string? EventDesc { get; set;}
        public int EventCategory { get; set;}
        public string? CatName {  get; set; }
        public double? OrigPrice { get; set; }
        public double? DiscPrice { get; set; }
        public string? EventDate { get; set; }
        public string? EventTime { get; set; }
        public string? ContactPerson { get; set;}
        public string? ContactNumber { get; set; }
        public string? EventBanner { get; set;}
        public string? EventMode { get; set; }
        public string? EventLocation { get; set; }
    }
}
