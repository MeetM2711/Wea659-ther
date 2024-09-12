
import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "./ApiComponent";
import LocationSelector from "./LocationSelector";
import bgImage from "../assets/images/day_bg.jpg";
import Logo from "../assets/images/logo.png";
import Sun from "../assets/images/sun.svg";

const statesAndCities = {
  AndhraPradesh: [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Kakinada",
    "Tirupati",
    "Anantapur",
    "Kadapa",
    "Srikakulam",
    "Ongole",
    "Chittoor",
    "Adoni",
    "Machilipatnam",
    "Tenali",
    "Proddatur",
    "Hindupur",
    "Bhimavaram",
    "Madanapalle",
    "Guntakal",
    "Dharmavaram",
    "Gudivada",
    "Nandyal",
    "Tadipatri",
    "Tadepalligudem",
    "Eluru",
    "Narasaraopet",
    "Rajam",
  ],
  ArunachalPradesh: [
    "Itanagar",
    "Tawang",
    "Pasighat",
    "Ziro",
    "Bomdila",
    "Aalo",
    "Naharlagun",
    "Seppa",
    "Roing",
    "Tezu",
    "Khonsa",
    "Namsai",
    "Yingkiong",
    "Anini",
    "Daporijo",
  ],
  Assam: [
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Tezpur",
    "Nagaon",
    "Tinsukia",
    "Sivasagar",
    "Lakhimpur",
    "Karimganj",
    "Golaghat",
    "Hojai",
    "Bongaigaon",
    "Barpeta",
    "Dhubri",
    "Diphu",
    "Goalpara",
    "Kokrajhar",
    "Udalguri",
    "Morigaon",
    "Nalbari",
    "Biswanath Chariali",
    "Haflong",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Purnia",
    "Darbhanga",
    "Bihar Sharif",
    "Ara",
    "Begusarai",
    "Katihar",
    "Munger",
    "Chhapra",
    "Danapur",
    "Saharsa",
    "Sasaram",
    "Hajipur",
    "Dehri",
    "Bettiah",
    "Motihari",
    "Nawada",
    "Buxar",
    "Kishanganj",
    "Sitamarhi",
    "Jamalpur",
    "Jehanabad",
    "Aurangabad",
    "Lakhisarai",
    "Samastipur",
    "Siwan",
    "Gopalganj",
  ],
  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Bilaspur",
    "Korba",
    "Durg",
    "Rajnandgaon",
    "Jagdalpur",
    "Raigarh",
    "Ambikapur",
    "Mahasamund",
    "Dhamtari",
    "Kanker",
    "Bhatapara",
    "Kawardha",
    "Chirmiri",
    "Dalli Rajhara",
    "Tilda",
    "Simga",
    "Sakti",
    "Mungeli",
    "Khairagarh",
    "Dongargarh",
  ],
  Goa: [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
    "Bicholim",
    "Sanquelim",
    "Curchorem",
    "Cuncolim",
    "Valpoi",
  ],
  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
    "Nadiad",
    "Morbi",
    "Mehsana",
    "Bharuch",
    "Anand",
    "Porbandar",
    "Godhra",
    "Navsari",
    "Veraval",
    "Bhuj",
    "Palanpur",
    "Valsad",
    "Himatnagar",
    "Patan",
    "Surendranagar",
    "Amreli",
    "Deesa",
    "Kalol",
    "Dahod",
    "Botad",
    "Dhoraji",
    "Jetpur",
  ],
  Haryana: [
    "Gurugram",
    "Faridabad",
    "Panipat",
    "Ambala",
    "Hisar",
    "Rohtak",
    "Karnal",
    "Sonipat",
    "Panchkula",
    "Yamunanagar",
    "Bhiwani",
    "Sirsa",
    "Bahadurgarh",
    "Jind",
    "Thanesar",
    "Kaithal",
    "Rewari",
    "Palwal",
    "Fatehabad",
    "Gohana",
    "Narnaul",
    "Mahendragarh",
    "Narwana",
    "Ratia",
    "Sohna",
  ],
  HimachalPradesh: [
    "Shimla",
    "Dharamshala",
    "Mandi",
    "Solan",
    "Palampur",
    "Baddi",
    "Hamirpur",
    "Kullu",
    "Nahan",
    "Bilaspur",
    "Chamba",
    "Paonta Sahib",
    "Una",
    "Sundernagar",
    "Kangra",
    "Kullu",
    "Keylong",
    "Kalpa",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro Steel City",
    "Deoghar",
    "Hazaribagh",
    "Giridih",
    "Ramgarh",
    "Medininagar",
    "Chirkunda",
    "Phusro",
    "Dumka",
    "Chaibasa",
    "Jhumri Tilaiya",
    "Gumia",
    "Simdega",
    "Godda",
    "Chatra",
    "Sahibganj",
    "Ghatshila",
    "Lohardaga",
    "Gumla",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubballi-Dharwad",
    "Mangaluru",
    "Belagavi",
    "Davangere",
    "Ballari",
    "Vijayapura",
    "Shivamogga",
    "Tumakuru",
    "Kalaburagi",
    "Udupi",
    "Davanagere",
    "Bidar",
    "Raichur",
    "Bagalkote",
    "Chikkamagaluru",
    "Hassan",
    "Kolar",
    "Mandya",
    "Chitradurga",
    "Gadag",
    "Haveri",
    "Koppal",
    "Ramanagara",
    "Chikkaballapura",
    "Yadgir",
    "Sirsi",
    "Bhadravati",
    "Channapatna",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kannur",
    "Kollam",
    "Alappuzha",
    "Palakkad",
    "Malappuram",
    "Kottayam",
    "Pathanamthitta",
    "Kasargod",
    "Idukki",
    "Wayanad",
  ],
  MadhyaPradesh: [
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
    "Dewas",
    "Satna",
    "Ratlam",
    "Rewa",
    "Murwara",
    "Singrauli",
    "Burhanpur",
    "Khandwa",
    "Bhind",
    "Chhindwara",
    "Guna",
    "Vidisha",
    "Shivpuri",
    "Chhatarpur",
    "Damoh",
    "Seoni",
    "Hoshangabad",
    "Itarsi",
    "Mandsaur",
    "Neemuch",
    "Katni",
    "Sehore",
    "Betul",
    "Ashok Nagar",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Kolhapur",
    "Nanded",
    "Sangli",
    "Jalgaon",
    "Akola",
    "Latur",
    "Ahmednagar",
    "Dhule",
    "Chandrapur",
    "Parbhani",
    "Beed",
    "Yavatmal",
    "Satara",
    "Gondia",
    "Wardha",
    "Bhandara",
    "Malegaon",
    "Raigad",
    "Ratnagiri",
    "Sindhudurg",
    "Osmanabad",
    "Gadchiroli",
    "Washim",
    "Hingoli",
  ],
  Manipur: [
    "Imphal",
    "Thoubal",
    "Churachandpur",
    "Bishnupur",
    "Ukhrul",
    "Kakching",
    "Senapati",
    "Tamenglong",
    "Jiribam",
    "Kangpokpi",
  ],
  Meghalaya: [
    "Shillong",
    "Tura",
    "Nongpoh",
    "Jowai",
    "Baghmara",
    "Williamnagar",
    "Mairang",
    "Mawkyrwat",
    "Nongstoin",
    "Resubelpara",
  ],
  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Saiha",
    "Champhai",
    "Kolasib",
    "Serchhip",
    "Lawngtlai",
    "Mamit",
  ],
  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Mon",
    "Phek",
    "Kiphire",
    "Longleng",
  ],
  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Berhampur",
    "Sambalpur",
    "Puri",
    "Balasore",
    "Baripada",
    "Bhadrak",
    "Jeypore",
    "Jharsuguda",
    "Bargarh",
    "Paradip",
    "Angul",
    "Dhenkanal",
    "Balangir",
    "Rayagada",
    "Gajapati",
    "Kendujhar",
    "Nayagarh",
    "Kendrapara",
    "Subarnapur",
  ],
  Punjab: [
    "Chandigarh",
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Mohali",
    "Moga",
    "Malerkotla",
    "Khanna",
    "Fazilka",
    "Ferozepur",
    "Barnala",
    "Kapurthala",
    "Sangrur",
    "Phagwara",
    "Tarn Taran",
    "Rajpura",
    "Faridkot",
    "Sunam",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Bikaner",
    "Alwar",
    "Bhilwara",
    "Bharatpur",
    "Pali",
    "Barmer",
    "Sikar",
    "Tonk",
    "Chittorgarh",
    "Kishangarh",
    "Jaisalmer",
    "Bundi",
    "Nagaur",
    "Sawai Madhopur",
    "Beawar",
    "Banswara",
    "Sri Ganganagar",
    "Hanumangarh",
    "Dholpur",
    "Dungarpur",
    "Jhalawar",
  ],
  Sikkim: [
    "Gangtok",
    "Namchi",
    "Geyzing",
    "Mangan",
    "Singtam",
    "Rangpo",
    "Ravangla",
    "Jorethang",
    "Mangan",
    "Yuksom",
  ],
  TamilNadu: [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Erode",
    "Tiruppur",
    "Vellore",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
    "Ranipet",
    "Sivakasi",
    "Cuddalore",
    "Nagercoil",
    "Kanchipuram",
    "Karur",
    "Udhagamandalam",
    "Kumbakonam",
    "Rajapalayam",
    "Pudukkottai",
    "Nagapattinam",
    "Viluppuram",
    "Namakkal",
    "Ariyalur",
    "Ramanathapuram",
    "Tenkasi",
    "Perambalur",
    "Thiruvarur",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Khammam",
    "Karimnagar",
    "Ramagundam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
    "Suryapet",
    "Miryalaguda",
    "Jagtial",
    "Mancherial",
    "Kothagudem",
    "Bodhan",
    "Wanaparthy",
    "Siddipet",
    "Kamareddy",
    "Sircilla",
    "Medak",
    "Vikarabad",
    "Nirmal",
    "Nagarkurnool",
    "Gadwal",
  ],
  Tripura: [
    "Agartala",
    "Dharmanagar",
    "Udaipur",
    "Kailashahar",
    "Belonia",
    "Ambassa",
    "Kamalpur",
    "Sonamura",
    "Amarpur",
    "Khowai",
  ],
  UttarPradesh: [
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Meerut",
    "Ghaziabad",
    "Allahabad",
    "Bareilly",
    "Aligarh",
    "Moradabad",
    "Saharanpur",
    "Gorakhpur",
    "Noida",
    "Firozabad",
    "Jhansi",
    "Muzaffarnagar",
    "Mathura",
    "Budaun",
    "Rampur",
    "Shahjahanpur",
    "Faizabad",
    "Lakhimpur",
    "Sitapur",
    "Mirzapur",
    "Bulandshahr",
    "Unnao",
    "Jaunpur",
    "Ballia",
    "Bijnor",
    "Maharajganj",
  ],
  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Haldwani",
    "Rishikesh",
    "Rudrapur",
    "Kashipur",
    "Roorkee",
    "Pithoragarh",
    "Almora",
    "Bageshwar",
    "Champawat",
    "Srinagar",
    "Pauri",
    "Lansdowne",
    "Tehri",
    "New Tehri",
    "Gopeshwar",
    "Uttarkashi",
  ],
  WestBengal: [
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Siliguri",
    "Asansol",
    "Bardhaman",
    "Kharagpur",
    "Darjeeling",
    "Malda",
    "Jalpaiguri",
    "Balurghat",
    "Bankura",
    "Alipurduar",
    "Cooch Behar",
    "Nadia",
    "Raiganj",
    "Krishnanagar",
    "Midnapore",
    "Suri",
    "Purulia",
    "Tamluk",
    "Basirhat",
  ],
  AndamanandNicobarIslands: [
    "Port Blair",
    "Car Nicobar",
    "Diglipur",
    "Havelock Island",
    "Rangat",
    "Mayabunder",
    "Neil Island",
    "Campbell Bay",
    "Kamorta",
    "Nancowry",
  ],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Silvassa",
    "Amli",
    "Kachigam",
    "Vapi",
    "Bhilad",
    "Naroli",
    "Sailvassa",
    "Kunta",
  ],
  Lakshadweep: [
    "Kavaratti",
    "Agatti",
    "Amini",
    "Andrott",
    "Minicoy",
    "Kalpeni",
    "Kadmat",
    "Kiltan",
    "Chetlat",
    "Bitra",
  ],
  Delhi: ["New Delhi", "Delhi"],
  Puducherry: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
  Ladakh: ["Leh", "Kargil"],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Baramulla",
    "Udhampur",
    "Sopore",
    "Kathua",
    "Pulwama",
    "Kupwara",
    "Poonch",
  ],
 
};

const WeatherApp = () => {
  const defaultState = "Gujarat";
  const defaultCity = "Surat";

  const [selectedState, setSelectedState] = useState(defaultState);
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Clear previous errors
        const data = await fetchWeatherData(selectedCity);
        console.log(data); // Log the response data for debugging
        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
        setWeatherData(null);
      }
    };

    fetchData();
  }, [selectedCity]);

  const extractWeatherDetails = () => {
    if (
      !weatherData ||
      !weatherData.timelines ||
      !weatherData.timelines.daily.length
    )
      return {};

    const dailyData = weatherData.timelines.daily[0].values;

    return {
      sunTemp: dailyData?.temperatureApparentAvg || "N/A",
      avgTemp: dailyData?.temperatureAvg || "N/A",
      minTemp: dailyData?.temperatureMin || "N/A",
      maxTemp: dailyData?.temperatureMax || "N/A",
      moisture: dailyData?.humidityAvg || "N/A",
      wind: dailyData?.windSpeedAvg || "N/A",
      clouds: dailyData?.cloudCoverAvg || "N/A",
    };
  };

  const weatherDetails = extractWeatherDetails();

  return (
    <div className="weather-app">
      <div className="weather-data">
        {error ? (
          <p>Error: {error}</p>
        ) : weatherData ? (
          
          <div>
            <div class="background">
              <img src={bgImage} alt="Wallpaper" class="img-background" />
            </div>
            <div class="main-grid">
              <div class="app-name-c">
                <span class="app-name-text">Weather App {selectedCity} </span>
                <img src={Logo} alt="logo" className="h-8"/>
              </div>
              <div class="content-container">
                <div class="content">
                  <div class="principal">
                    <div class="header">
                      <LocationSelector
                        statesAndCities={statesAndCities}
                        selectedState={selectedState}
                        setSelectedState={setSelectedState}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                      />
                    </div>
                    <div class="result">
                      <img
                        src={Sun}
                        alt="icon"
                        class="weather-icon"
                      />
                      <h1 class="temperature">
                        {weatherDetails.sunTemp}<span>ºC</span>
                      </h1>
                    </div>
                    <div class="other-results">
                      <div class="other">
                        Avg Temp:
                        <br />
                        <span>{weatherDetails.avgTemp}ºC</span>
                      </div>
                      <div class="other">
                        Min Temp:
                        <br />
                        <span>{weatherDetails.minTemp}ºC</span>
                      </div>
                      <div class="other">
                        Max Temp:
                        <br />
                        <span>{weatherDetails.maxTemp} ºC</span>
                      </div>
                    </div>
                  </div>
                  <div class="secondary">
                    <div class="secondary-results">
                      <div class="other-secondary-results">
                        <div class="icon-secondary-results humidity">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M5.636 6.633L12 0.269 18.364 6.633C21.878 10.148 21.878 15.846 18.364 19.361 14.849 22.876 9.151 22.876 5.636 19.361 2.121 15.846 2.121 10.148 5.636 6.633z"></path>
                          </svg>
                        </div>
                        <p>
                          Moisture:
                          <br />
                          {weatherDetails.moisture}%
                        </p>
                      </div>
                      <div class="other-secondary-results">
                        <div class="icon-secondary-results">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            viewBox="0 0 30 30"
                          >
                            <path d="M3.1 16.97c0 .24.09.45.28.62.16.19.37.28.63.28H18.7c.29 0 .53.1.73.3.2.2.3.45.3.74 0 .29-.1.53-.3.72-.2.19-.44.29-.74.29-.29 0-.54-.1-.73-.29-.16-.18-.36-.26-.6-.26-.25 0-.46.09-.64.26s-.27.38-.27.61c0 .25.09.46.28.63.56.55 1.22.83 1.96.83.78 0 1.45-.27 2.01-.81.56-.54.83-1.19.83-1.97s-.28-1.44-.84-2c-.56-.56-1.23-.84-2-.84H4.01c-.25 0-.46.09-.64.26C3.19 16.51 3.1 16.72 3.1 16.97zM3.1 13.69c0 .23.09.43.28.61.17.18.38.26.63.26h20.04c.78 0 1.45-.27 2.01-.82.56-.54.84-1.2.84-1.97 0-.77-.28-1.44-.84-1.99s-1.23-.83-2.01-.83c-.77 0-1.42.27-1.95.8-.18.16-.27.38-.27.67 0 .26.09.47.26.63.17.16.38.24.63.24.24 0 .45-.08.63-.24.19-.21.42-.31.7-.31.29 0 .53.1.73.3.2.2.3.44.3.73 0 .29-.1.53-.3.72-.2.19-.44.29-.73.29H4.01c-.25 0-.46.09-.64.26C3.19 13.23 3.1 13.44 3.1 13.69z"></path>
                          </svg>
                        </div>
                        <p>
                          Wind:
                          <br />
                          {weatherDetails.wind} m/s
                        </p>
                      </div>
                      <div class="other-secondary-results">
                        <div class="icon-secondary-results">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            width="1em"
                            fill="currentColor"
                            viewBox="0 0 30 30"
                          >
                            <path d="M3.89 17.6c0-.99.31-1.88.93-2.65s1.41-1.27 2.38-1.49c.26-1.17.85-2.14 1.78-2.88.93-.75 2-1.12 3.22-1.12 1.18 0 2.24.36 3.16 1.09.93.73 1.53 1.66 1.8 2.8h.27c1.18 0 2.18.41 3.01 1.24s1.25 1.83 1.25 3c0 1.18-.42 2.18-1.25 3.01s-1.83 1.25-3.01 1.25H8.16c-.58 0-1.13-.11-1.65-.34S5.52 21 5.14 20.62c-.38-.38-.68-.84-.91-1.36s-.34-1.1-.34-1.6zm1.45-1.1c0 .76.28 1.42.82 1.96s1.21.82 1.99.82h9.28c.77 0 1.44-.27 1.99-.82.55-.55.83-1.2.83-1.96 0-.76-.27-1.42-.83-1.96-.55-.54-1.21-.82-1.99-.82h-1.39c-.1 0-.15-.05-.15-.15l-.07-.49c-.19-1.38-.91-2.54-2.12-3.38s-2.67-1.21-4.23-.8c-1.6.4-2.81 1.39-3.73 2.67-.47.73-.73 1.57-.73 2.46z"></path>
                          </svg>
                        </div>
                        <p>
                          Pressure:
                          <br />
                          {weatherDetails.clouds} hPa
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
