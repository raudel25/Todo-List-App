using back_end.Commands;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services;

public interface ITodoCommandHandler
{
    public Task<int> Handler(CreateTodo request);

    public Task Handler(UpdateTodo request);

    public Task Handler(RemoveTodo request);
}

public class TodoCommandHandler : ITodoCommandHandler
{
    private readonly TodoContext _context;

    public TodoCommandHandler(TodoContext context)
    {
        this._context = context;
    }

    public async Task<int> Handler(CreateTodo request)
    {
        var todo = request.Todo();

        this._context.Add(todo);
        await this._context.SaveChangesAsync();

        return todo.Id;
    }

    public async Task Handler(UpdateTodo request)
    {
        var todo = request.Todo();

        this._context.Update(todo);
        await this._context.SaveChangesAsync();
    }

    public async Task Handler(RemoveTodo request)
    {
        var todo = await this._context.Todos.SingleOrDefaultAsync(t => t.Id == request.Id);

        if (todo is null) return;

        this._context.Remove(todo);
        await this._context.SaveChangesAsync();
    }
}