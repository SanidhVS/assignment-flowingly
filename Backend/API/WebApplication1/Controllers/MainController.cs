using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {

        // POST api/<MainController>
        [HttpPost("calculate")]
        public ActionResult<List<CharValue>> CalculateNumOfChars([FromForm]string value)
        {
            try
            {
                value = value.ToUpper();
                var returnVal = new List<CharValue>();
                var charArray = (value.Where(c => !char.IsWhiteSpace(c)).ToArray()).Distinct().ToArray();
                for (int i = 0; i < charArray.Count(); i++)
                {
                    var totalOccurance = value.Count(x => x == charArray[i]);
                    returnVal.Add(new CharValue()
                    {
                        Character = charArray[i],
                        Count = totalOccurance
                    });
                }
                return Ok(returnVal);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
