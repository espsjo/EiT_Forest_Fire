using Microsoft.EntityFrameworkCore;

namespace eit_forestry.Models
{
    public class DeviceContext : DbContext
    {
        public DeviceContext(DbContextOptions<DeviceContext> options)
        : base(options)
        {
        }

        public DbSet<Device> Device { get; set; } = null!;
    }
}
