using back_end.Models;

namespace back_end.Commands;

public class CreateTodo
{
    public string TodoItem { get; set; } = null!;

    public long CreateDate { get; set; }

    public long? CompleteDate { get; set; }

    public Todo Todo() =>
        new Todo { TodoItem = TodoItem, CreateDate = CreateDate, CompleteDate = CompleteDate };
}