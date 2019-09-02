using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NoteApp.Models;
using NoteApp.Utils;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NoteApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private IConfiguration _config;
        private NoteContext _context;

        public LoginController(IConfiguration config, NoteContext context)
        {
            _config = config;
            _context = context;
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]User login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { Username = user.Username, Msg = "Logged in", Token = tokenString});
            }

            return response;
        }

        private string GenerateJSONWebToken(User userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private User AuthenticateUser(User login)
        {
            //Query user
            User user = _context.Users
                                .Where(u => u.Username == login.Username)
                                .FirstOrDefault();
            // Run hash even if user doesn't exist
            bool isValidPassword = Equals(AuthUtils.GeneratePasswordHash(login.Password), user.Password);
            if (!isValidPassword) {                
                user = null;
                return user;
            }
            return user;                

        }
    }
}
