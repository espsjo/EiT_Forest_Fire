namespace eit_forestry.Models
{
    public class ReadingItem
    {
        public long Id { get; set; }
        public float Temperature{ get; set;}
        public float Humidity { get; set;}
        public DateTime ReadingTime { get; set;}
    }
}
