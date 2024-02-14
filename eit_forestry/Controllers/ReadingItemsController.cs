using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eit_forestry.Models;

namespace eit_forestry.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReadingItemsController : ControllerBase
    {
        private readonly ReadingContext _context;

        public ReadingItemsController(ReadingContext context)
        {
            _context = context;
        }

        // GET: api/ReadingItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadingItem>>> GetReadingItem()
        {
            return await _context.ReadingItem.ToListAsync();
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
        [HttpPost]
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
