using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace CRUD.Models
{
    public partial class DBSHYMONEYV1Context : DbContext
    {
        public virtual DbSet<Option> Option { get; set; }
        public virtual DbSet<Sum> Sum { get; set; }
        public virtual DbSet<SumTagConn> SumTagConn { get; set; }
        public virtual DbSet<Tag> Tag { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-H9NVH5Q;Database=DBSHYMONEYV1;User Id=sa;Password=bitbit;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Option>(entity =>
            {
                entity.ToTable("OPTION");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreateBy)
                    .HasColumnName("CREATE_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.CreateDate)
                    .HasColumnName("CREATE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.GraphviewDateFrom)
                    .HasColumnName("GRAPHVIEW_DATE_FROM")
                    .HasColumnType("datetime");

                entity.Property(e => e.GraphviewDateTo)
                    .HasColumnName("GRAPHVIEW_DATE_TO")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsActive)
                    .HasColumnName("IS_ACTIVE")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.MasterDateFrom)
                    .HasColumnName("MASTER_DATE_FROM")
                    .HasColumnType("datetime");

                entity.Property(e => e.MasterDateTo)
                    .HasColumnName("MASTER_DATE_TO")
                    .HasColumnType("datetime");

                entity.Property(e => e.ModifyBy)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.MonthlyaveragesDateFrom)
                    .HasColumnName("MONTHLYAVERAGES_DATE_FROM")
                    .HasColumnType("datetime");

                entity.Property(e => e.MonthlyaveragesDateTo)
                    .HasColumnName("MONTHLYAVERAGES_DATE_TO")
                    .HasColumnType("datetime");

                entity.Property(e => e.OwnerId)
                    .HasColumnName("OWNER_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.PeriodaveragesDateFrom)
                    .HasColumnName("PERIODAVERAGES_DATE_FROM")
                    .HasColumnType("datetime");

                entity.Property(e => e.PeriodaveragesDateTo)
                    .HasColumnName("PERIODAVERAGES_DATE_TO")
                    .HasColumnType("datetime");

                entity.Property(e => e.StartingDate)
                    .HasColumnName("STARTING_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.StartingSum)
                    .HasColumnName("STARTING_SUM")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.Owner)
                    .WithMany(p => p.Option)
                    .HasForeignKey(d => d.OwnerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OWNERID");
            });

            modelBuilder.Entity<Sum>(entity =>
            {
                entity.ToTable("SUM");

                entity.Property(e => e.ID)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CREATE_BY)
                    .HasColumnName("CREATE_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.CREATE_DATE)
                    .HasColumnName("CREATE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.DATE)
                    .HasColumnName("DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.MODIFY_BY)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.MODIFY_DATE)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.STATE)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.SUM)
                    .HasColumnName("SUM")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.TITLE)
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SumTagConn>(entity =>
            {
                entity.ToTable("SUM_TAG_CONN");

                entity.Property(e => e.ID)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.SUM_ID)
                    .HasColumnName("SUM_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.TAG_ID)
                    .HasColumnName("TAG_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.HasOne(d => d.SUM)
                    .WithMany(p => p.SUM_TAG_CONN)
                    .HasForeignKey(d => d.SUM_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SUMID");

                entity.HasOne(d => d.TAG)
                    .WithMany(p => p.SUM_TAG_CONN)
                    .HasForeignKey(d => d.TAG_ID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGID");
            });

            modelBuilder.Entity<Tag>(entity =>
            {
                entity.ToTable("TAG");

                entity.Property(e => e.ID)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CREATE_BY)
                    .HasColumnName("CREATE_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.CREATE_DATE)
                    .HasColumnName("CREATE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.DESCRIPTION)
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ICON)
                    .HasColumnName("ICON")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.MODIFY_BY)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.MODIFY_DATE)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.QUICKBAR_PLACE)
                    .HasColumnName("QUICKBAR_PLACE")
                    .HasColumnType("numeric(5, 0)");

                entity.Property(e => e.STATE)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.TITLE)
                    .IsRequired()
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("USER");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.CreateBy)
                    .HasColumnName("CREATE_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.CreateDate)
                    .HasColumnName("CREATE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Email)
                    .HasColumnName("EMAIL")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ModifyBy)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("PASSWORD")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("USERNAME")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
