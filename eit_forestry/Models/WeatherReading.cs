namespace eit_forestry.Models
{
    public class WeatherReading
    {
        public class CurrentReading
        {
            public float Precipitation { get; set; }
            public float Wind_Speed_10M { get; set; }
        }

        public class HourlyReading
        {
            public List<float> Soil_Moisture_1_To_3cm { get; set; }
        }
        
        public CurrentReading Current {  get; set; }
      
        public HourlyReading Hourly {  get; set; }

    }
}
