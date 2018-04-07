using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLibrary.Models
{
    public partial class DBSHYMONEYV1Context : DbContext
    {
        public virtual DbSet<IntellisenseModel> Intellisense { get; set; }
        public virtual DbSet<IntellisenseTagConnModel> IntellisenseTagConn { get; set; }
        public virtual DbSet<OptionModel> Option { get; set; }
        public virtual DbSet<SumModel> Sum { get; set; }
        public virtual DbSet<SumTagConnModel> SumTagConn { get; set; }
        public virtual DbSet<TagModel> Tag { get; set; }
        public virtual DbSet<UserModel> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=DESKTOP-H9NVH5Q;Database=DBSHYMONEYV1;User Id=sa;Password=bitbit;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IntellisenseModel>(entity =>
            {
                entity.ToTable("INTELLISENSE");

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

                entity.Property(e => e.Description)
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.IsDatesMatch).HasColumnName("IS_DATES_MATCH");

                entity.Property(e => e.IsDatesOverwriteable)
                    .HasColumnName("IS_DATES_OVERWRITEABLE")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.IsSaveOnSelect).HasColumnName("IS_SAVE_ON_SELECT");

                entity.Property(e => e.IsTodayDates).HasColumnName("IS_TODAY_DATES");

                entity.Property(e => e.ModifyBy)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.SumAccountDate)
                    .HasColumnName("SUM_ACCOUNT_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.SumDescription)
                    .HasColumnName("SUM_DESCRIPTION")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.SumDueDate)
                    .HasColumnName("SUM_DUE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.SumInputDate)
                    .HasColumnName("SUM_INPUT_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.SumSum)
                    .HasColumnName("SUM_SUM")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.SumTitle)
                    .HasColumnName("SUM_TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<IntellisenseTagConnModel>(entity =>
            {
                entity.ToTable("INTELLISENSE_TAG_CONN");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.IntellisenseId)
                    .HasColumnName("INTELLISENSE_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.TagId)
                    .HasColumnName("TAG_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.HasOne(d => d.Intellisense)
                    .WithMany(p => p.IntellisenseTagConn)
                    .HasForeignKey(d => d.IntellisenseId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ITC_INTELLISENSEID");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.IntellisenseTagConn)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ITC_TAGID");
            });

            modelBuilder.Entity<OptionModel>(entity =>
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

            modelBuilder.Entity<SumModel>(entity =>
            {
                entity.ToTable("SUM");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.AccountDate)
                    .HasColumnName("ACCOUNT_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.CreateBy)
                    .HasColumnName("CREATE_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.CreateDate)
                    .HasColumnName("CREATE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.DueDate)
                    .HasColumnName("DUE_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.InputDate)
                    .HasColumnName("INPUT_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.IsPayed)
                    .HasColumnName("IS_PAYED")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.ModifyBy)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Sum)
                    .HasColumnName("SUM")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.Title)
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<SumTagConnModel>(entity =>
            {
                entity.ToTable("SUM_TAG_CONN");

                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .HasColumnType("numeric(15, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.SumId)
                    .HasColumnName("SUM_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.TagId)
                    .HasColumnName("TAG_ID")
                    .HasColumnType("numeric(15, 0)");

                entity.HasOne(d => d.Sum)
                    .WithMany(p => p.SumTagConn)
                    .HasForeignKey(d => d.SumId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SUMID");

                entity.HasOne(d => d.Tag)
                    .WithMany(p => p.SumTagConn)
                    .HasForeignKey(d => d.TagId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_TAGID");
            });

            modelBuilder.Entity<TagModel>(entity =>
            {
                entity.ToTable("TAG");

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

                entity.Property(e => e.Description)
                    .HasColumnName("DESCRIPTION")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Icon)
                    .HasColumnName("ICON")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.ModifyBy)
                    .HasColumnName("MODIFY_BY")
                    .HasColumnType("numeric(15, 0)");

                entity.Property(e => e.ModifyDate)
                    .HasColumnName("MODIFY_DATE")
                    .HasColumnType("datetime");

                entity.Property(e => e.QuickbarPlace)
                    .HasColumnName("QUICKBAR_PLACE")
                    .HasColumnType("numeric(5, 0)");

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasColumnName("STATE")
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("TITLE")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<UserModel>(entity =>
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
