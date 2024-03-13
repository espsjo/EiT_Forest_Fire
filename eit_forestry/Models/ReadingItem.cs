namespace eit_forestry.Models
{
    public class ReadingItem
    {
        public long Id { get; set; }
        public float Temperature{ get; set;}
        public float Humidity { get; set;}
        public float Precipitation { get; set;}
        public float WindSpeed { get; set;}
        public float GroundMoisture { get; set;}
        public DateTime ReadingTime { get; set;}
        public string DeviceId { get; set; }
    }
}
