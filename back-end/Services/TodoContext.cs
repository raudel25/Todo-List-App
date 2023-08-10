using Microsoft.EntityFrameworkCore;
using back_end.Models;

namespace back_end.Services;

public class TodoContext : DbContext
{
    public DbSet<Todo> Todos { get; set; } = null!;
    
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }
}