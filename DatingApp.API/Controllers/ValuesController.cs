using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    //http:localhost:5000/api/values
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        //private readonly Mapper _mapper;
        public ValuesController(DataContext context)
        {
            _context=context;
            // _mapper = mapper;
            
        }
         [AllowAnonymous] 
        // GET api/values
        [HttpGet] 
        public async Task<IActionResult> GetValues()
        {
           // throw new Exception("Test Exception");
           var values=await _context.Values.ToListAsync();
            return Ok(values);
           //var users=await _context.Users.Include(p=>p.Photos).ToListAsync();
          // var usersToReturn=_mapper.Map<IEnumerable<UserForListDto>>(users);
            //return Ok(usersToReturn);
        }
          
        // GET api/values/5
        [AllowAnonymous] 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value=await _context.Values.FirstOrDefaultAsync(x=>x.Id==id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
