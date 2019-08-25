using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NoteApp.Models
{
    public class NoteContext : DbContext
    {
        public NoteContext(DbContextOptions<NoteContext> options)
            : base(options)
        { }

        public DbSet<Note> Notes { get; set; }
    }

    public class Note
    {
        public int NoteId { get; set; }
        public string Body { get; set; }
    }
}
