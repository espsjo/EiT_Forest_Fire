
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eit_forestry.Models;
using System.Text;
using eit_forestry.Services;


namespace eit_forestry.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class ReadingItemsController : ControllerBase
    {
        private readonly ReadingContext _context;
        private readonly DeviceContext _deviceContext;
        public readonly ILogger<ReadingItemsController> _logger; 

        public ReadingItemsController(ReadingContext context, DeviceContext deviceContext, ILogger<ReadingItemsController> logger)
        {
            _logger = logger;
            _context = context;
            _deviceContext = deviceContext;
        }

        // GET: api/ReadingItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadingItem>>> GetReadingItem()
        {
            return await _context.ReadingItem.ToListAsync();
        }


        // GET: api/ReadingItems
        [HttpGet("/prediction")]
        public async Task<ActionResult<List<Prediction>>> GetPrediction()
        {
            var devices = await _deviceContext.Device.ToListAsync();
            List<Prediction> predictions = new List<Prediction>();
            Prediction prediction;
            foreach (Device device in devices)
            {
                Console.WriteLine($"Getting predictions for device {device.Id}");
                prediction = new Prediction();
                var datapoints = await _context.ReadingItem.Where(x => x.DeviceId == device.Id).OrderByDescending(x => x.ReadingTime).Take(72).ToListAsync();
                prediction.DangerLevel = ReadingService.Algorithm(datapoints);
                prediction.Longitude = device.Longitude;
                prediction.Latitude = device.Latitude;
                predictions.Add(prediction);
            }
            return predictions;
        }

        // GET: api/ReadingItems
        [HttpPost("/")]
        public async Task<ActionResult> PostReadingItemFromSpan(Message messages)
        {
            _logger.LogInformation(Encoding.UTF8.GetString(Convert.FromBase64String(messages.messages[0].payload)));
            string payload = Encoding.UTF8.GetString(Convert.FromBase64String(messages.messages[0].payload));
            string[] parameters = payload.Split(",");
            if (parameters.Length > 2)
            {
                return BadRequest();
            }
            ReadingItem readingItem = new ReadingItem();
            readingItem.Temperature = float.Parse(parameters[0]);
            readingItem.Humidity = float.Parse(parameters[1])/100;
            readingItem.ReadingTime = DateTime.Now;
            readingItem.DeviceId = messages.messages[0].device.deviceId;
            using (var client = new HttpClient())
            {

                WeatherReading weather = new WeatherReading();
                // HTTP GET
                var device = await _deviceContext.Device.FindAsync(readingItem.DeviceId);
                if (device == null) return BadRequest();
                HttpResponseMessage response = await client.GetAsync($"https://api.open-meteo.com/v1/forecast?latitude={device.Latitude}&longitude={device.Longitude}&current=precipitation,wind_speed_10m&hourly=soil_moisture_1_to_3cm");
                if (response.IsSuccessStatusCode)
                {
                    weather = await response.Content.ReadFromJsonAsync<WeatherReading>();
                    readingItem.Precipitation = weather.Current.Precipitation;
                    readingItem.WindSpeed = weather.Current.Wind_Speed_10M;
                    readingItem.GroundMoisture = weather.Hourly.Soil_Moisture_1_To_3cm[weather.Hourly.Soil_Moisture_1_To_3cm.Count - 1];
                }
                else return BadRequest();
            }

            _context.ReadingItem.Add(readingItem);
            await _context.SaveChangesAsync();
            return Accepted();
        }

        // GET: api/ReadingItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadingItem>> GetReadingItem(long id)
        {
            var readingItem = await _context.ReadingItem.FindAsync(id);

            if (readingItem == null)
            {
                return NotFound();
            }

            return readingItem;
        }

        // PUT: api/ReadingItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReadingItem(long id, ReadingItem readingItem)
        {
            if (id != readingItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(readingItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReadingItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ReadingItems
        [HttpPost("ReadingItems")]
        public async Task<ActionResult<ReadingItem>> PostReadingItem(ReadingItem readingItem)
        {
            _context.ReadingItem.Add(readingItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetReadingItem), new { id = readingItem.Id }, readingItem);
        }

        // DELETE: api/ReadingItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReadingItem(long id)
        {
            var readingItem = await _context.ReadingItem.FindAsync(id);
            if (readingItem == null)
            {
                return NotFound();
            }

            _context.ReadingItem.Remove(readingItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReadingItemExists(long id)
        {
            return _context.ReadingItem.Any(e => e.Id == id);
        }
    }
}
