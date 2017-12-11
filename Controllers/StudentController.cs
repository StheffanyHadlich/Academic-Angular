using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Academic.Data;
using Academic.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Academic.Controllers
{
    [Route("api/[controller]")]
    public class StudentController : Controller
    {

        public StudentController(AcademicContext dbContext, IOptions<AppSettings> options)
        {
            DbContext = dbContext;
            AppSettings = options.Value;
        }

        private AppSettings AppSettings { get; }
        public AcademicContext DbContext { get; }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await DbContext.Student.Include(m=> m.city.state).ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id) //read
        {
            return Ok(await DbContext.Student.SingleOrDefaultAsync(m => m.Id == id));
            

        }

        [HttpPost()]
        public async Task<IActionResult> Post([FromBody]Student value) // CREATE
        {
            if (value != null)
            {
                await DbContext.Student.AddAsync(value);
                await DbContext.SaveChangesAsync();
                value.city = await DbContext.City.SingleOrDefaultAsync(m => m.Id == value.cityId);
                value.city.state = await DbContext.State.SingleOrDefaultAsync(m => m.Id == value.city.stateId);
                return Ok(value);
            }
            else
            {
                return BadRequest();
            }

        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody]Student value) // UPDATE
        {
            if (value == null || value.Id != id)
            {
                return BadRequest();
            }

            var updateValue = await DbContext.Student.FirstOrDefaultAsync(t => t.Id == id);

            if (updateValue == null)
            {
                return NotFound();
            }

            updateValue.name = value.name;
            updateValue.address = value.address;
            updateValue.email = value.email;
            updateValue.telephone = value.telephone;
            updateValue.city = value.city;


            DbContext.Student.Update(updateValue);
            await DbContext.SaveChangesAsync();
            return new NoContentResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var student = await DbContext.Student.SingleOrDefaultAsync(m => m.Id == id);
            DbContext.Student.Remove(student);
            await DbContext.SaveChangesAsync();
            return NoContent();
        }



    }
}