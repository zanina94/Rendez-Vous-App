namespace backend.Entities
{
    public class Disponibility
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string? HourBegin { get; set; }
        public string? HourEnd { get; set; }

        public string? Description { get; set; }
        public string? Email { get; set; }
        public bool IsRequested { get; set; }
        public bool IsReserved { get; set; }
        public int? UserId { get; set; }
        public virtual User? User { get; set; }

    }
}
