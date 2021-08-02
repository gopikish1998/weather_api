async function getCityData(){
    const my_id='8d74606b-afcf-4bf5-94e3-9dab3b2dd3f4';
    const state_data = await fetch(`http://api.airvisual.com/v2/states?country=india&key=${my_id}`)
    .then((x)=>x.json())
    .catch(error => console.log('error', error));
    // console.log(state_data);
    const bodies=document.createElement("div");
    bodies.innerText=`Weather Report`;
    bodies.className="para";
    document.body.append(bodies);
    const bod=document.createElement("div");
    const bod1=document.createElement("div");
    bod1.className="para";
    bod1.appendChild(document.createElement("br"));
    bod1.appendChild(bod);
    const state = document.createElement("select");
    state.setAttribute("id","input");
    const c =document.createElement("label");
    c.setAttribute("for","input");
    c.innerText="Select a State";
    bod.append(c);
    bod.appendChild(document.createElement("br"));
    bod.append(state);
    document.body.append(bod1);
    var option1=document.createElement("option");
    option1.innerText="select state";
    state.append(option1);     
    for(i of state_data.data){
        var x=document.createElement("option");
        x.setAttribute("value",i.state)
        state.append(x)
        x.innerText=i.state;
    }
    const city_name=document.createElement("div");
    city_name.innerText=``;
        city_name.setAttribute("id","city");
        bod.append(city_name);
    
    const weather = document.createElement("div");
    
        weather.setAttribute("id","weather");
        bod.append(weather);
    // state.setAttribute("onchange",cities());
    state.onchange=(function(){
        document.getElementById('city').remove();
        document.getElementById('weather').remove();
        cities();
                      
    });
    
    async function cities(){
        bod2=document.createElement("div")
        const d =document.createElement("label");
    d.setAttribute("for","city");
    d.innerText="Select City";
    bod2.append(d);
    bod2.appendChild(document.createElement("br"));
        const city_name=document.createElement("select");
        city_name.setAttribute("id","city");
        bod2.append(city_name);
        bod1.appendChild(bod2)
        var option2=document.createElement("option");
    option2.innerText="select city";
    city_name.append(option2);     
        var c=document.getElementById("input").value;
        var city = await fetch(`http://api.airvisual.com/v2/cities?state=${c}&country=india&key=${my_id}`).then((x)=>x.json());
        console.log(city);
        for(j of city.data){
            var y=document.createElement("option");
            y.setAttribute("value",j.city);
            city_name.append(y);
            y.innerText=j.city;
        }
        var z= city_name.value;
        city_name.onchange=(async function(){
            z=city_name.value;
            var da = await fetch(`http://api.airvisual.com/v2/city?city=${z}&state=${c}&country=India&key=${my_id}`).then((x)=>x.json()).catch(error => console.log('error', error));
            console.log(da.data.current.weather)
            weather.className="weather";
            weather.innerHTML = `
            <table>
            <tr>
              <th>CITY NAME</th>
              <th>${z}</th>
            </tr>
            <tr>
              <th>Temperature</th>
              <th>${da.data.current.weather.tp} °C </th>
            </tr>
            <tr>
              <th>Date</th>
              <th>${new Date(da.data.current.weather.ts).toDateString()}</th>
            </tr>
            <tr>
              <th>Last Updated: </th>
              <th>${new Date(da.data.current.weather.ts).toTimeString()}</th>
            </tr>
            <tr>
              <th>Pressure</th>
              <th>${da.data.current.weather.pr} hPa</th>
            </tr>
            <tr>
              <th>Humidity</th>
              <th>${da.data.current.weather.hu} %</th>
            </tr>
            <tr>
              <th>Wind Speed</th>
              <th>${da.data.current.weather.ws}m/s</th>
            </tr>
            <tr>
              <th>Wind Direction</th>
              <th>${da.data.current.weather.wd}° (with reference to North)</th>
            </tr>
            <tr>
              <th>Cloud cover</th>
              <th><img src="${da.data.current.weather.ic}.png" style="height:80px;"></th>
            </tr>
            </table>`;
             
         
            document.body.append(weather);
        })
        



    }
  }
  getCityData();