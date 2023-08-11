using back_end.Models;
using back_end.Queries;
using back_end.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services;

public interface ITodoQueryHandler
{
    public Task<Todo> Handler(GetTodo request);

    public Task<List<Todo>> Handler(GetTodos request);
}

public class TodoQueryHandler : ITodoQueryHandler
{
    private readonly TodoContext _context;

    public TodoQueryHandler(TodoContext context)
    {
        this._context = context;
    }

    public async Task<Todo> Handler(GetTodo request)
    {
        var response = await this._context.Todos.SingleOrDefaultAsync(t=>request.Id==t.Id);

        if (response is null) throw new NotFoundException($"Not found Todo with id{request.Id}");
        return response;
    }

    public async Task<List<Todo>> Handler(GetTodos request)
    {
        return await this._context.Todos.ToListAsync();
    }
}