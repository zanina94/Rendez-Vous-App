using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isReserved",
                table: "Disponibilities",
                newName: "IsReserved");

            migrationBuilder.RenameColumn(
                name: "isRequested",
                table: "Disponibilities",
                newName: "IsRequested");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsReserved",
                table: "Disponibilities",
                newName: "isReserved");

            migrationBuilder.RenameColumn(
                name: "IsRequested",
                table: "Disponibilities",
                newName: "isRequested");
        }
    }
}
