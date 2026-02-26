using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddConstraintsToPayeeName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Payees",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Payees_Name",
                table: "Payees",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Payees_Name",
                table: "Payees");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Payees",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
