using back_end.Commands;
using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Services;

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

    [HttpPost]
    public async Task<IActionResult> Post(CreateTodo request)
    {
        await this._commandHandler.Handler(request);
        return Ok();
    }
}