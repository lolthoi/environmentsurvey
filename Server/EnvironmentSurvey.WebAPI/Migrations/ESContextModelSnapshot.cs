﻿// <auto-generated />
using System;
using EnvironmentSurvey.WebAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace EnvironmentSurvey.WebAPI.Migrations
{
    [DbContext(typeof(ESContext))]
    partial class ESContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:Collation", "Latin1_General_CI_AS")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.8")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Answer1")
                        .HasColumnType("text")
                        .HasColumnName("Answer");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("IsCorrect")
                        .HasColumnType("int")
                        .HasColumnName("isCorrect");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Faq", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Issue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Solution")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("FAQs");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Question1")
                        .HasColumnType("text")
                        .HasColumnName("Question");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Result", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("Point")
                        .HasColumnType("int");

                    b.Property<DateTime>("SubmitTime")
                        .HasColumnType("datetime");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SurveyId");

                    b.HasIndex("UserId");

                    b.ToTable("Results");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Seminar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime");

                    b.Property<string>("Image")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<string>("Subject")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("forUser")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Seminars");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.SupportInformation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Company")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CompanyTel")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Supporter")
                        .HasColumnType("text");

                    b.Property<string>("SupporterTel")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("SupportInfo");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Survey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("EndTime")
                        .HasColumnType("datetime");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("SerminarId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SerminarId");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.SurveyQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("QuestionId")
                        .HasColumnType("int");

                    b.Property<int>("SurveyId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("SurveyId");

                    b.ToTable("Survey_Questions");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("FirstName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int?>("Gender")
                        .HasColumnType("int");

                    b.Property<string>("Image")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("NumberId")
                        .IsRequired()
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Status")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValueSql("('1')");

                    b.Property<string>("Tel")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(255)
                        .IsUnicode(false)
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex(new[] { "Username" }, "UQ__Users__536C85E4BBB71199")
                        .IsUnique();

                    b.HasIndex(new[] { "Email" }, "UQ__Users__A9D105343684F975")
                        .IsUnique();

                    b.HasIndex(new[] { "Tel" }, "UQ__Users__C451FA8D3CE481DA")
                        .IsUnique()
                        .HasFilter("[Tel] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.UserAnswer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("AnswerId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SurveyQuestionId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId");

                    b.HasIndex("SurveyQuestionId");

                    b.HasIndex("UserId");

                    b.ToTable("User_Answers");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.UserSeminar", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DeletedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("SeminarId")
                        .HasColumnType("int");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasDefaultValueSql("('1')");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SeminarId");

                    b.HasIndex("UserId");

                    b.ToTable("UserSeminars");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Answer", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Question", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .HasConstraintName("FK__Answers__Questio__30F848ED")
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Result", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Survey", "Survey")
                        .WithMany("Results")
                        .HasForeignKey("SurveyId")
                        .HasConstraintName("FK__Results__SurveyI__36B12243")
                        .IsRequired();

                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.User", "User")
                        .WithMany("Results")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK__Results__UserId__35BCFE0A")
                        .IsRequired();

                    b.Navigation("Survey");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Survey", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Seminar", "Serminar")
                        .WithMany("Surveys")
                        .HasForeignKey("SerminarId")
                        .HasConstraintName("FK__Surveys__Sermina__2C3393D0")
                        .IsRequired();

                    b.Navigation("Serminar");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.SurveyQuestion", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Question", "Question")
                        .WithMany("SurveyQuestions")
                        .HasForeignKey("QuestionId")
                        .HasConstraintName("FK__Survey_Qu__Quest__3A81B327")
                        .IsRequired();

                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Survey", "Survey")
                        .WithMany("SurveyQuestions")
                        .HasForeignKey("SurveyId")
                        .HasConstraintName("FK__Survey_Qu__Surve__398D8EEE")
                        .IsRequired();

                    b.Navigation("Question");

                    b.Navigation("Survey");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.UserAnswer", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Answer", "Answer")
                        .WithMany("UserAnswers")
                        .HasForeignKey("AnswerId")
                        .HasConstraintName("FK__User_Answ__Answe__3E52440B");

                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.SurveyQuestion", "SurveyQuestion")
                        .WithMany("UserAnswers")
                        .HasForeignKey("SurveyQuestionId")
                        .HasConstraintName("FK__User_Answ__Surve__3D5E1FD2")
                        .IsRequired();

                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.User", "User")
                        .WithMany("UserAnswers")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK__User_Answ__UserI__3F466844")
                        .IsRequired();

                    b.Navigation("Answer");

                    b.Navigation("SurveyQuestion");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.UserSeminar", b =>
                {
                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.Seminar", "Seminar")
                        .WithMany("UserSeminars")
                        .HasForeignKey("SeminarId")
                        .HasConstraintName("FK__UserSeminars__SurveyI__36B12243")
                        .IsRequired();

                    b.HasOne("EnvironmentSurvey.WebAPI.DataAccess.Domains.User", "User")
                        .WithMany("UserSeminars")
                        .HasForeignKey("UserId")
                        .HasConstraintName("FK__UserSeminars__UserId__35BCFE0A")
                        .IsRequired();

                    b.Navigation("Seminar");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Answer", b =>
                {
                    b.Navigation("UserAnswers");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Question", b =>
                {
                    b.Navigation("Answers");

                    b.Navigation("SurveyQuestions");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Seminar", b =>
                {
                    b.Navigation("Surveys");

                    b.Navigation("UserSeminars");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.Survey", b =>
                {
                    b.Navigation("Results");

                    b.Navigation("SurveyQuestions");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.SurveyQuestion", b =>
                {
                    b.Navigation("UserAnswers");
                });

            modelBuilder.Entity("EnvironmentSurvey.WebAPI.DataAccess.Domains.User", b =>
                {
                    b.Navigation("Results");

                    b.Navigation("UserAnswers");

                    b.Navigation("UserSeminars");
                });
#pragma warning restore 612, 618
        }
    }
}
