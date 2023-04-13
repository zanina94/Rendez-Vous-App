using backend.Entities;
using backend.Helpers;
using backend.Models;
using BCryptNet = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Utils;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private IJwtUtils _jwtUtils;
        public UserController(DataContext dataContext, IJwtUtils jwtUtils)
        {
            _dataContext = dataContext;
            _jwtUtils = jwtUtils;

        }

        [HttpPost("Login")]
        public IActionResult Login(AuthenticateRequest authenticateRequest)
        {
            var dbUser = _dataContext.Users.SingleOrDefault(x => x.Email == authenticateRequest.Email);

            // validate
            if (dbUser == null || !BCryptNet.Verify(authenticateRequest.Password, dbUser.Password))
                return BadRequest("Votre émail ou mot de passe est incorrect");

            // authentication successful
            AuthenticateResponse response = new AuthenticateResponse();
            response.Id = dbUser.Id;
            response.Email = dbUser.Email; 
            response.FirstName = dbUser.FirstName;
            response.LastName = dbUser.LastName;
            response.Role = dbUser.Role;
            response.Token = _jwtUtils.GenerateToken(dbUser);
            return Ok(response);
        }

        [HttpPost("Register")]
        public IActionResult Register(User user)
        {
            // validate
            if (_dataContext.Users.Any(x => x.Email == user.Email))
                return BadRequest("Cet émail est déjà pris");
            //throw new AppException("Email '" + user.Email + "' is already taken");

            // map model to new user object

            // hash password
            user.Password = BCryptNet.HashPassword(user.Password);

            // save user
            AuthenticateResponse response = new AuthenticateResponse();
            response.Id = user.Id;
            response.Email = user.Email;
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.Role = user.Role;
            response.Token = _jwtUtils.GenerateToken(user);
            _dataContext.Users.Add(user);
            _dataContext.SaveChanges();
            return Ok(response);
        }


        [HttpPut("Edit/{id}")]
        public IActionResult Edit(int id,User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            // validate
            if (_dataContext.Users.Where(x=>x.Id != user.Id).Any(x => x.Email == user.Email))
                throw new AppException("Cet émail est déjà pris");

            // map model to new user object

            // hash password
            user.Password = BCryptNet.HashPassword(user.Password);

            // save user
            _dataContext.Entry(user).State = EntityState.Modified;
            try
            {
                 _dataContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {

                throw;
            }
            return Ok();
        }

    }
}
