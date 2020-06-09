using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.models;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Dtos;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _mapper = mapper;
            _config = config;
            _repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto UserForRegisterDto)
        {

            UserForRegisterDto.Username = UserForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(UserForRegisterDto.Username))
            {
                return BadRequest("username is already exist !");

            }

            var userToCreate = _mapper.Map<User>(UserForRegisterDto);

            var userCreated = await _repo.Register(userToCreate, UserForRegisterDto.Password);
            var userToReaturn=_mapper.Map<UserForDetailedDto>(userCreated);
            return CreatedAtRoute("GetUser",new {Controller="Users",id=userCreated.Id},userToReaturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {


            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);
            if (userFromRepo == null)
            {
                return Unauthorized();
            }
            var claims = new[]
            {
              new Claim(ClaimTypes.NameIdentifier ,userFromRepo.Id.ToString()),
              new Claim(ClaimTypes.Name ,userFromRepo.Username)
          };

            var key = new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var user =_mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }

    }
}