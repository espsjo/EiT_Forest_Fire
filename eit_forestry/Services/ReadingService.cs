using eit_forestry.Controllers;
using eit_forestry.Models;
using Microsoft.AspNetCore.Mvc;
namespace eit_forestry.Services
{
    public class ReadingService
    {
        //One of, if not the most substantial algorithm in the field of fire forestry
        public readonly ILogger<ReadingService> _logger;
        public ReadingService() 
        {
          
        }

        public static float Algorithm(List<ReadingItem> items) 
        {
            float dangerLevel = items.First().GroundMoisture != 0 ? 1 - (items.First().GroundMoisture * items.First().GroundMoisture) : 0;
            float tempSum = 0;
            float precipSum = 0;
            float humiditySum = 0;
            float windSpeed = items.First().WindSpeed;

            Console.WriteLine($"Danger level is now: {dangerLevel}");
            foreach (ReadingItem item in items)
            {
                precipSum += item.Precipitation;
                humiditySum += item.Humidity;
            }

            foreach (ReadingItem item in items.Take(5))
            {
                tempSum += item.Temperature;
            }

            tempSum = items.Count > 5 ? tempSum / 5 : tempSum /= items.Count;
            humiditySum /= items.Count;

            dangerLevel = tempSum / 20 * dangerLevel;
            Console.WriteLine($"Danger level is now: {dangerLevel}");
            switch (precipSum) {
                case < 5:
                    dangerLevel *= 1.2f;
                    break;
                case < 20:
                    break;
                case < 50:
                    dangerLevel *= 0.9f;
                    break;
                case >= 50:
                    dangerLevel *= 0.5f;
                    break;
                default:
                    break;
            }
            Console.WriteLine($"Danger level is now: {dangerLevel}");
            dangerLevel = (1.4f-humiditySum) * dangerLevel;
            Console.WriteLine($"Danger level is now: {dangerLevel}");
            return dangerLevel;
        }
    }
}
