using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataManagementAPI.Model
{
    public class Observation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Data> Datas { get; set; }
    }

    public class Data
    {
        public DateTime SamplingTime { get; set; }
        public List<Property> Properties { get; set; }
    }

    public class Property
    {
        public object Value { get; set; }
        public string Label { get; set; }
    }

    public class UpdateRequest
    {
        public string SamplingTime { get; set; }
        public List<Property> Properties { get; set; }
    }

}
