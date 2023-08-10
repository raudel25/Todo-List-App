using Microsoft.AspNetCore.Mvc;
using back_end.Models;

namespace back_end.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    [HttpPost]
    public IActionResult Post(Todo todo)
    {
        return Ok();
    }
}