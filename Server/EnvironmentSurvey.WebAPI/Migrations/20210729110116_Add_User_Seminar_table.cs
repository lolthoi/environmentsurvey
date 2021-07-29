using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EnvironmentSurvey.WebAPI.Migrations
{
    public partial class Add_User_Seminar_table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Surveys",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "forUser",
                table: "Seminars",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "UserSeminars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SeminarId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false, defaultValueSql: "('1')"),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DeletedDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSeminars", x => x.Id);
                    table.ForeignKey(
                        name: "FK__UserSeminars__SurveyI__36B12243",
                        column: x => x.SeminarId,
                        principalTable: "Seminars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UserSeminars__UserId__35BCFE0A",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSeminars_SeminarId",
                table: "UserSeminars",
                column: "SeminarId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSeminars_UserId",
                table: "UserSeminars",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSeminars");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "forUser",
                table: "Seminars");
        }
    }
}
