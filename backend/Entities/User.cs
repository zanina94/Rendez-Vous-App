﻿namespace backend.Entities
{
    using System.Data;
    using System.Text.Json.Serialization;

    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; } = "User";
        public string Password { get; set; }
        public virtual ICollection<Disponibility>? Disponibilities { get; set; }
    }
}
