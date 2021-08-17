using Microsoft.EntityFrameworkCore.Migrations;

namespace EnvironmentSurvey.WebAPI.Migrations
{
    public partial class deleteColumSubmitTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubmitTime",
                table: "Results");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SubmitTime",
                table: "Results",
                type: "int",
                nullable: false,
                defaultValueSql: "('1')");
        }
    }
}
