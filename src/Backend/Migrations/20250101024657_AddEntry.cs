using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddEntry : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Categories_CategoryId",
                table: "Entries");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "Entries",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Entries",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Entries",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Entries",
                newName: "Value");

            migrationBuilder.RenameIndex(
                name: "IX_Entries_CategoryId",
                table: "Entries",
                newName: "IX_Entries_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Users_UserId",
                table: "Entries",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Entries_Users_UserId",
                table: "Entries");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "Entries",
                newName: "Amount");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Entries",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Entries",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Entries",
                newName: "Time");

            migrationBuilder.RenameIndex(
                name: "IX_Entries_UserId",
                table: "Entries",
                newName: "IX_Entries_CategoryId");

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Entries_Categories_CategoryId",
                table: "Entries",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
