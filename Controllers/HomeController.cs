﻿using Microsoft.AspNetCore.Mvc;

namespace TestApp2.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
