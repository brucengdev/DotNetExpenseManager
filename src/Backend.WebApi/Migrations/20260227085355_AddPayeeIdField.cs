using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddPayeeIdField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PayeeId",
                table: "Entries",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Entries_PayeeId",
                table: "Entries",
                column: "PayeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Payees_PayeeId",
                table: "Entries",
                column: "PayeeId",
                principalTable: "Payees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Payees_PayeeId",
                table: "Entries");

            migrationBuilder.DropIndex(
                name: "IX_Entries_PayeeId",
                table: "Entries");

            migrationBuilder.DropColumn(
                name: "PayeeId",
                table: "Entries");
        }
    }
}
