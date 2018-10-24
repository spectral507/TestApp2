using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TestApp2.Models
{
    public class MemoryItemList : IItemList
    {
        private List<Item> items;
        private ConcurrentExclusiveSchedulerPair pair;
        private TaskFactory readFactory;
        private TaskFactory writeFactory;

        public MemoryItemList()
        {
            Init();
        }

        private void Init()
        {
            this.pair = new ConcurrentExclusiveSchedulerPair();
            this.readFactory = new TaskFactory(this.pair.ConcurrentScheduler);
            this.writeFactory = new TaskFactory(this.pair.ExclusiveScheduler);
            this.items = new List<Item>();
        }

        public Task<IEnumerable<Item>> GetItems()
        {
            return this.readFactory.StartNew<IEnumerable<Item>>(() => this.items);
        }

        public Task<Item> GetItem(int id)
        {
            return this.readFactory.StartNew<Item>(() =>
            {
                return this.items.FirstOrDefault(item => item.Id == id);
            });
        }

        public Task<int> AddItem(Item item)
        {
            return this.writeFactory.StartNew<int>(() =>
            {
                int id = 1;
                while (this.items.Any(i => i.Id == id))
                {
                    id++;
                }
                item.Id = id;
                this.items.Add(item);
                return id;
            });
        }

        public Task UpdateItem(Item item)
        {
            return this.writeFactory.StartNew(() =>
            {
                Item i = this.items.First(x => x.Id == item.Id);
                i.Description = item.Description;
                i.Done = item.Done;
            });
        }

        public Task DeleteItem(int id)
        {
            return this.writeFactory.StartNew(() =>
            {
                var item = this.items.FirstOrDefault(i => i.Id == id);
                if (item != null)
                {
                    this.items.Remove(item);
                }
            });
        }
    }
}
