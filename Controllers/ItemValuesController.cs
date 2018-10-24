using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestApp2.Models;

namespace TestApp2.Controllers
{
    [Route("api/items")]
    public class ItemValuesController : Controller
    {
        private IItemList itemList;

        public ItemValuesController(IItemList itemList)
        {
            this.itemList = itemList;
        }

        [HttpGet]
        public async Task<IEnumerable<Item>> GetItems()
        {
            return await this.itemList.GetItems();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            Item item = await this.itemList.GetItem(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> PostItem([FromBody]ItemInputModel model)
        {
            if (ModelState.IsValid)
            {
                int id = await itemList.AddItem(new Item()
                {
                    Done = model.Done,
                    Description = model.Description
                });
                return Ok(id);
            }
            return BadRequest(ModelState);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, [FromBody]ItemInputModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    await this.itemList.UpdateItem(new Item()
                    {
                        Id = id,
                        Done = model.Done,
                        Description = model.Description
                    });
                }
                catch (InvalidOperationException)
                {
                    return NotFound();
                }
                return NoContent();
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            this.itemList.DeleteItem(id);
            return NoContent();
        }
    }
}
