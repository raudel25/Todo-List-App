using back_end.Models;

namespace back_end.Commands;

public class UpdateTodo
{
    public int Id { get; set; }

    public string TodoItem { get; set; } = null!;

    public long CreateDate { get; set; }

    public long? CompleteDate { get; set; }

    public Todo Todo() =>
        new Todo { Id = Id, TodoItem = TodoItem, CreateDate = CreateDate, CompleteDate = CompleteDate };
}