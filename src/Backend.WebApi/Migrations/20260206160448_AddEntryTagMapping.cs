using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddEntryTagMapping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EntryTagMappings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntryId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntryTagMappings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EntryTagMappings_Entries_EntryId",
                        column: x => x.EntryId,
                        principalTable: "Entries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntryTagMappings_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_EntryTagMappings_EntryId",
                table: "EntryTagMappings",
                column: "EntryId");

            migrationBuilder.CreateIndex(
                name: "IX_EntryTagMappings_TagId",
                table: "EntryTagMappings",
                column: "TagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EntryTagMappings");
        }
    }
}
