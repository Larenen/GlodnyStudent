﻿// <auto-generated />
using System;
using GlodnyStudent.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GlodnyStudent.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190523173125_GlodnyStudentMigration")]
    partial class GlodnyStudentMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GlodnyStudent.Models.Domain.AddressCoordinates", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<long>("RestaurantAddressId");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantAddressId")
                        .IsUnique();

                    b.ToTable("AddressCoordinates");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Cuisine", b =>
                {
                    b.Property<string>("Name")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("RestaurantId");

                    b.HasKey("Name");

                    b.HasIndex("RestaurantId")
                        .IsUnique();

                    b.ToTable("Cuisines");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Image", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<byte[]>("ImageSource");

                    b.Property<long>("RestaurantId");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.MenuItem", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(13,2)");

                    b.Property<long>("RestaurantId");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.ToTable("MenuItems");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Restaurant", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<long>("OwnerId");

                    b.Property<int>("Score");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Restaurants");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.RestaurantAddress", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(7);

                    b.Property<int>("LocalNumber");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasMaxLength(6);

                    b.Property<long>("RestaurantId");

                    b.Property<string>("Street")
                        .IsRequired();

                    b.Property<string>("StreetNumber")
                        .IsRequired()
                        .HasMaxLength(7);

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId")
                        .IsUnique();

                    b.ToTable("RestaurantAddresses");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Review", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("AddTime");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<long>("RestaurantId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("RestaurantId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<int>("Role");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.AddressCoordinates", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.RestaurantAddress", "RestaurantAddress")
                        .WithOne("Coordinates")
                        .HasForeignKey("GlodnyStudent.Models.Domain.AddressCoordinates", "RestaurantAddressId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Cuisine", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.Restaurant", "Restaurant")
                        .WithOne("Cuisine")
                        .HasForeignKey("GlodnyStudent.Models.Domain.Cuisine", "RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Image", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.Restaurant", "Restaurant")
                        .WithMany("Gallery")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.MenuItem", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.Restaurant", "Restaurant")
                        .WithMany("Menu")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Restaurant", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.User", "Owner")
                        .WithMany("Restaurants")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.RestaurantAddress", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.Restaurant", "Restaurant")
                        .WithOne("Address")
                        .HasForeignKey("GlodnyStudent.Models.Domain.RestaurantAddress", "RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("GlodnyStudent.Models.Domain.Review", b =>
                {
                    b.HasOne("GlodnyStudent.Models.Domain.Restaurant", "Restaurant")
                        .WithMany("Reviews")
                        .HasForeignKey("RestaurantId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("GlodnyStudent.Models.Domain.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
