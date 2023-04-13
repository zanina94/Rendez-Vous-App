using backend.Entities;
using backend.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DisponibilityController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public DisponibilityController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        //[Route("GetAll")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Disponibility>>> GetDisponibilities()
        {
            if(_dataContext == null)
                return NotFound();
            //_dataContext.Database.EnsureCreated();
            return await _dataContext.Disponibilities.ToListAsync();
        }

        [HttpGet("GetDisponibilitiesByUserId/{userId}")]
        public async Task<ActionResult<IEnumerable<Disponibility>>> GetDisponibilitiesByUserId(int userId)
        {
            if (_dataContext == null)
                return NotFound();
            //_dataContext.Database.EnsureCreated();
            return await _dataContext.Disponibilities.Where(d=>d.UserId == userId).ToListAsync();
        }

        //[Route("GetById")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Disponibility>> GetDisponibility(int id)
        {
            if (_dataContext == null)
                return NotFound();
            var disponibility = await _dataContext.Disponibilities.FindAsync(id);
            if(disponibility == null)
                return NotFound();
            return disponibility;   
        }

        //[Route("Create")]
        [HttpPost]
        public async Task<ActionResult<Disponibility>> PostDisponibility(Disponibility disponibility)
        {
            Disponibility newDisponibility = new Disponibility();
            newDisponibility.Id = disponibility.Id;
            newDisponibility.HourEnd = disponibility.HourEnd;   
            newDisponibility.HourBegin = disponibility.HourBegin;   
            newDisponibility.Date = disponibility.Date.AddDays(1);
            newDisponibility.Description = disponibility.Description;
            newDisponibility.Email = disponibility.Email;
            newDisponibility.IsRequested = disponibility.IsRequested;
            newDisponibility.IsReserved = disponibility.IsReserved;
            _dataContext.Disponibilities.Add(newDisponibility);
            await _dataContext.SaveChangesAsync();  
            return CreatedAtAction(nameof(GetDisponibility), new {id = newDisponibility.Id}, newDisponibility);
        }

        //[Route("Update")]
        [HttpPut("{id}")]
        public async Task<ActionResult> PutDisponibility(int id, Disponibility disponibility)
        {
            if(id != disponibility.Id)
            { 
                return BadRequest();
            }
            _dataContext.Entry(disponibility).State = EntityState.Modified;
            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
            return Ok();
        }

        //[Route("Delete")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDisponibility(int id)
        {
            if (_dataContext == null)
            {
                return NotFound();
            }
            var disponibility = await _dataContext.Disponibilities.FindAsync(id);
            if (disponibility == null)
            {
                return NotFound();
            }
            _dataContext.Disponibilities.Remove(disponibility);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

    }
}
