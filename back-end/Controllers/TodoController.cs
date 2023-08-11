using back_end.Commands;
using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Services;
using back_end.Exceptions;
using back_end.Queries;

namespace back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoCommandHandler _commandHandler;

    private readonly ITodoQueryHandler _queryHandler;

    public TodoController(ITodoCommandHandler commandHandler, ITodoQueryHandler queryHandler)
    {
        this._queryHandler = queryHandler;
        this._commandHandler = commandHandler;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Todo>> Get(int id)
    {
        try
        {
            var response = await this._queryHandler.Handler(new GetTodo { Id = id });

            return response;
        }
        catch (NotFoundException e)
        {
            return NotFound(new { e.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> Get()
    {
        var response = await this._queryHandler.Handler(new GetTodos());

        return response;
    }

    [HttpPost]
    public async Task<ActionResult<int>> Post(CreateTodo request)
    {
        var id = await this._commandHandler.Handler(request);
        return id;
    }

    [HttpPut]
    public async Task<IActionResult> Put(UpdateTodo request)
    {
        await this._commandHandler.Handler(request);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await this._commandHandler.Handler(new RemoveTodo { Id = id });
        return Ok();
    }
}