var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended : true}));

var city ='New Delhi';
var url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c3b0a15935292c27087140ab506aec5f`;
var weather;
app.get('/',(req,res)=>{
 
    request(url, (error, response, body)=>{
        weather_json = JSON.parse(body);
        console.log(weather_json);
        console.log(url);

        weather = {
            city: city,
            temperature: Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            icon: weather_json.weather[0].icon,
            message:city+ "'s weather Found"
        };

        var weather_data = {weather : weather};

        res.render('wether',weather_data);
    })


});

app.post('/',(req,res)=>{
    var city =req.body.city_name;
    var url =`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c3b0a15935292c27087140ab506aec5f`
    
    request(url, (error, response, body)=>{
        weather_json = JSON.parse(body);
        console.log(weather_json);
        if(weather_json.message=='city not found')
            {
               weather.message=city +"'s weather Not Found";
                var weather_data = {weather : weather};
                res.render('wether',weather_data);
            }
        else
        {
            weather = {
                city: city,
                temperature: Math.round(weather_json.main.temp),
                description : weather_json.weather[0].description,
                icon: weather_json.weather[0].icon,
                message: city+ "'s weather found"
            };
    
            var weather_data = {weather : weather};
    
            res.render('wether',weather_data);
        }
    
        
    })

});

app.listen(process.env.PORT||8080,()=>{
    console.log("Port running Succesfully");
    
})