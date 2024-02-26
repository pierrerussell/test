using System;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseAPIController
    {
        private readonly DataContext _context;
        public BuggyController (DataContext context)
        {
             _context = context;
        }

        [Authorize]
        [HttpGet("auth")] //ensure return 401 when user not authorized against endpoiint
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }

        [HttpGet("not-found")] //ensure return 401 when user not authorized against endpoiint
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _context.Users.Find(-1);
            if (thing == null) return NotFound();
            return thing;
        }


        [HttpGet("server-error")] //ensure return 401 when user not authorized against endpoiint
        public ActionResult<string> GetServerError()
        {
            var thing = _context.Users.Find(-1);

            var thingToReturn = thing.ToString();
            
            return thingToReturn;

    
        }


        [HttpGet("bad-request")] //ensure return 401 when user not authorized against endpoiint
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("not good request");
        }
        
    }
}