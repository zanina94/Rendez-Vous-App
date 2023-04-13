namespace backend.Helpers
{
    using backend.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Storage;

    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(IConfiguration configuration) 
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to mysql with connection string from app settings
            var connectionString = Configuration.GetConnectionString("rendezVousAppDataBase");
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            options.UseLazyLoadingProxies();
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity("Aime.Logger.Loggers.Database.Model.Log", b =>
        //    {
        //        b.Property<int>("Id")
        //          .ValueGeneratedOnAdd();
        //        b.Property<DateTime>("Datetime");
        //        b.HasKey("Id");
        //        b.ToTable("Logs");
        //    });

        //    base.OnModelCreating(modelBuilder);
        //}

        public DbSet<User> Users { get; set; }
        public DbSet<Disponibility> Disponibilities { get; set; }
    }
}
