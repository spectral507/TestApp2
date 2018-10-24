using System.ComponentModel.DataAnnotations;

namespace TestApp2.Controllers
{
    public class ItemInputModel
    {
        [Required, MinLength(3), MaxLength(30)]
        public string Description { get; set; }

        public bool Done { get; set; }
    }
}