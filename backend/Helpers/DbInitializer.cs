using backend.Entities;

namespace backend.Helpers
{
    internal class DbInitializer
    {
        public static void Initialize(DataContext dbContext)
        {
            ArgumentNullException.ThrowIfNull(dbContext, nameof(dbContext));
            dbContext.Database.EnsureCreated();
            if (dbContext.Users.Any()) return;

            var users = new User[]
            {
            new User{ Id = 1, FirstName = "admin", LastName ="admin",Email="admin@test.com",
            Password="$2a$11$/pHu3dCHUPWGkSnGTpRGnuDT/WZ98IN3hNY47XJ9jKFqwtRsgNc0e",Role="Admin"},
            new User{ Id = 2, FirstName = "test", LastName ="test",Email="test@test.com",
            Password="$2a$11$/pHu3dCHUPWGkSnGTpRGnuDT/WZ98IN3hNY47XJ9jKFqwtRsgNc0e",Role="User"}
            //add other users
            };

            foreach (var user in users)
                dbContext.Users.Add(user);
            dbContext.SaveChanges();

            var disponibility = new Disponibility
            {
                Id = 1,
                Date = DateTime.Now,
                HourBegin =  DateTime.Today.AddHours(8).ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'"),
                HourEnd = DateTime.Today.AddHours(10).ToUniversalTime().ToString("yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fff'Z'"),
                Description = "description",
                Email = "admin@test.com",
                IsRequested = false,
                IsReserved = false
            };

            dbContext.Disponibilities.Add(disponibility);

            dbContext.SaveChanges();
        }
    }
}
