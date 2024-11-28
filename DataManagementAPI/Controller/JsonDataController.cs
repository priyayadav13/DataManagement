using DataManagementAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace DataManagementAPI.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class JsonDataController : ControllerBase
    {
        private readonly string _jsonPath = Path.Combine(Directory.GetCurrentDirectory(),"Assets", "JsonData.json");

        //Function to read json file 
        private Observation ReadJsonFile()
        {
            if (!System.IO.File.Exists(_jsonPath))
            {
                return null;
            }
            var jsonData = System.IO.File.ReadAllText(_jsonPath);
            return JsonSerializer.Deserialize<Observation>(jsonData);
        }

        //Get Json file data 
        [HttpGet]
        public IActionResult GetData() {
            try
            {
                var data = ReadJsonFile();
                return Ok(data);
            }
            catch (Exception ex) {
                return BadRequest();
            }
        }

        //Upadate value of label based on Sampling time 
        [HttpPut("update")]
        public async Task<IActionResult> UpdateData([FromBody] UpdateRequest updateRequest)
        {
            if (updateRequest.Properties == null || !updateRequest.Properties.Any())
            {
                return BadRequest("Properties list is empty or null.");
            }

            var data = ReadJsonFile();
            var dataToUpdate = data.Datas.FirstOrDefault(d => d.SamplingTime.ToString() == updateRequest.SamplingTime.ToString());

            if (dataToUpdate == null)
            {
                return NotFound("Data not found for the provided SamplingTime");
            }

            foreach (var property in updateRequest.Properties)
            {
                var existingProperty = dataToUpdate.Properties.FirstOrDefault(p => p.Label == property.Label);
                if (existingProperty != null)
                {
                    existingProperty.Value = property.Value;
                }
                else
                {
                    dataToUpdate.Properties.Add(new Property
                    {
                        Label = property.Label,
                        Value = property.Value
                    });
                }
            }

            var updatedJson = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            await System.IO.File.WriteAllTextAsync(_jsonPath, updatedJson);

            return Ok("Data updated");
        }
    }
}
