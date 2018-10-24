using System.Collections.Generic;
using System.Threading.Tasks;

namespace TestApp2.Models
{
    public interface IItemList
    {
        Task<IEnumerable<Item>> GetItems();
        Task<Item> GetItem(int id);
        Task<int> AddItem(Item item);
        Task UpdateItem(Item item);
        Task DeleteItem(int id);
    }
}
