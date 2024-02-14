using Microsoft.EntityFrameworkCore;

namespace eit_forestry.Models
{
    public class ReadingContext: DbContext
    {
        public ReadingContext(DbContextOptions<ReadingContext> options)
        : base(options)
        {
        }

        public DbSet<ReadingItem> ReadingItem { get; set; } = null!;
    }
}
