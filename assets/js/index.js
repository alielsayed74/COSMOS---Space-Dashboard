// sideBar events
let sideBar = document.querySelectorAll('a')
let today = document.querySelector('#today-sec')
let launches = document.querySelector('#launch-sec')
let planets = document.querySelector('#planet-sec')
// back to home while refresh 
if(history.scrollRestoration){
    history.scrollRestoration = "manual"
    launches.classList.add('hidden')
    planets.classList.add('hidden')
}
// console.log(sideBar[0].classList.contains('today-in-space'));
// change button on sideBar
for(let i=0; i<sideBar.length; i++){
    sideBar[i].addEventListener('click', function(){
        reset()
        sideBar[i].classList.remove('text-slate-300',
        'hover:bg-slate-800')
        sideBar[i].classList.add('bg-blue-500/10',
        'text-blue-400')
        // this loop to swap between section 
        if(i==1){
            today.classList.add('hidden')
            launches.classList.remove('hidden')
            planets.classList.add('hidden')
        }else if(i==2){
            today.classList.add('hidden')
            launches.classList.add('hidden')
            planets.classList.remove('hidden')
        }else if(i==0){
            today.classList.remove('hidden')
            launches.classList.add('hidden')
            planets.classList.add('hidden')
        }
    })
}
// remove all styles in buttons 
function reset(){
    for(let i=0; i<sideBar.length; i++){
            sideBar[i].classList.remove('bg-blue-500/10',
            'text-blue-400')
            sideBar[i].classList.add('text-slate-300',
            'hover:bg-slate-800')
    }
}

// planets section
let planetCard = document.querySelectorAll('.planet-card')
let planetGlobal = 'Earth'
getPlanets() 
// console.log(planetCard);
for(let i=0; i<planetCard.length; i++){
    planetCard[i].addEventListener('click', function(){
      planetGlobal = planetCard[i].getAttribute('data-planet-id')
      // console.log(planetGlobal);
        planetCard[i].classList.remove('hidden')
        getPlanets()
    })
}
let allPlanets = []
async function getPlanets(){
    var req = await fetch('https://solar-system-opendata-proxy.vercel.app/api/planets')
    var resp = await req.json()
    allPlanets = resp.bodies
    // console.log(allPlanets)
    displayPlanets()

    // console.log(allPlanets[i].englishName)
    function displayPlanets(){
      let car = ' '
      for(let i=0; i< allPlanets.length; i++){
        if(planetGlobal == allPlanets[i].englishName){
        car += `<div
                class="flex flex-col xl:flex-row xl:items-start space-y-4 xl:space-y-0"
              >
                <div
                  class="relative h-48 w-48 md:h-64 md:w-64 shrink-0 mx-auto xl:mr-6"
                >
                  <img
                    id="planet-detail-image"
                    class="w-full h-full object-contain"
                    src="./assets/images/${allPlanets[i].englishName}.png"
                    alt="${allPlanets[i].englishName} planet detailed realistic render with clouds and continents"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-3 md:mb-4">
                    <h3
                      id="planet-detail-name"
                      class="text-2xl md:text-3xl font-space font-bold"
                    >
                      ${allPlanets[i].englishName}
                    </h3>
                    <button
                      class="w-10 h-10 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                      <i class="far fa-heart"></i>
                    </button>
                  </div>
                  <p
                    id="planet-detail-description"
                    class="text-slate-300 mb-4 md:mb-6 leading-relaxed text-sm md:text-base"
                  >
                    ${allPlanets[i].description}
                  </p>
                </div>
              </div>
               <div class="grid grid-cols-2 gap-2 md:gap-4 mt-4">
                <div class="bg-slate-900/50 rounded-lg p-3 md:p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-ruler text-xs"></i>
                    <span class="text-xs">Semimajor Axis</span>
                  </p>
                  <p
                    id="planet-distance"
                    class="text-sm md:text-lg font-semibold"
                  >
                    ${((allPlanets[i].semimajorAxis)/1000000).toFixed(1)}M km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-circle"></i>
                    Mean Radius
                  </p>
                  <p id="planet-radius" class="text-lg font-semibold">
                    ${allPlanets[i].meanRadius.toFixed()} km
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-weight"></i>
                    Mass
                  </p>
                  <p id="planet-mass" class="text-lg font-semibold">
                    ${allPlanets[i].mass.massValue.toFixed(5)} × 10<sup>${allPlanets[i].mass.massExponent}</sup> kg
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-compress"></i>
                    Density
                  </p>
                  <p id="planet-density" class="text-lg font-semibold">
                    ${allPlanets[i].density.toFixed(2)} g/cm³
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-sync-alt"></i>
                    Orbital Period
                  </p>
                  <p id="planet-orbital-period" class="text-lg font-semibold">
                    ${allPlanets[i].sideralOrbit.toFixed(2)} days
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-redo"></i>
                    Rotation Period
                  </p>
                  <p id="planet-rotation" class="text-lg font-semibold">
                    ${allPlanets[i].sideralRotation.toFixed(2)} hours
                  </p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-moon"></i>
                    Moons
                  </p>
                  <p id="planet-moons" class="text-lg font-semibold">${(allPlanets[i]).moons?.length || 0}</p>
                </div>
                <div class="bg-slate-900/50 rounded-lg p-4">
                  <p
                    class="text-xs text-slate-400 mb-1 flex items-center gap-1"
                  >
                    <i class="fas fa-arrows-alt-v"></i>
                    Gravity
                  </p>
                  <p id="planet-gravity" class="text-lg font-semibold">
                    ${allPlanets[i].gravity.toFixed(2)} m/s²
                  </p>
                </div>
              </div>`}}
        document.getElementById('planet-data').innerHTML = car
        car = ' '
        for(let i=0; i<allPlanets.length; i++){
          if(planetGlobal == allPlanets[i].englishName){
          car+= `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-user-astronaut text-purple-400 mr-2"></i>
                  Discovery Info
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovered By</span>
                    <span
                      id="planet-discoverer"
                      class="font-semibold text-right"
                      >${allPlanets[i].discoveredBy? allPlanets[i].discoveredBy : 'Known since antiquity' }</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Discovery Date</span>
                    <span id="planet-discovery-date" class="font-semibold"
                      >${allPlanets[i].discoveryDate? allPlanets[i].discoveryDate : 'Ancient' }</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Body Type</span>
                    <span id="planet-body-type" class="font-semibold"
                      >${allPlanets[i].bodyType}</span
                    >
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Volume</span>
                    <span id="planet-volume" class="font-semibold">${allPlanets[i].vol.volValue} x 10<sup>${allPlanets[i].vol.volExponent}</sup> km<sup>3</sup></span>
                  </div>
                </div>`
        }}
        document.getElementById('discovery').innerHTML = car
        car = ' '
        for(let i=0; i<allPlanets.length; i++){
          if(planetGlobal == allPlanets[i].englishName){
          car += `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-lightbulb text-yellow-400 mr-2"></i>
                  Quick Facts
                </h4>
                <ul id="planet-facts" class="space-y-3 text-sm">
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Mass: ${allPlanets[i].mass.massValue} x 10<sup>${allPlanets[i].mass.massExponent}</sup> kg</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Surface gravity: ${allPlanets[i].gravity} m/s²</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Density: ${allPlanets[i].density} g/cm³</span
                    >
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                    <span class="text-slate-300"
                      >Axial tilt: ${allPlanets[i].axialTilt}°</span
                    >
                  </li>
                </ul>`
        }}
        document.getElementById('quick-facts').innerHTML = car
        car = ' '
        for(let i=0; i<allPlanets.length; i++){
          if(planetGlobal == allPlanets[i].englishName){
          car += `<h4 class="font-semibold mb-4 flex items-center">
                  <i class="fas fa-satellite text-blue-400 mr-2"></i>
                  Orbital Characteristics
                </h4>
                <div class="space-y-3 text-sm">
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Perihelion</span>
                    <span id="planet-perihelion" class="font-semibold"
                      >${(allPlanets[i].perihelion/1000000).toFixed(1)}M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Aphelion</span>
                    <span id="planet-aphelion" class="font-semibold"
                      >${(allPlanets[i].aphelion/1000000).toFixed(1)}M km</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Eccentricity</span>
                    <span id="planet-eccentricity" class="font-semibold"
                      >${allPlanets[i].eccentricity}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Inclination</span>
                    <span id="planet-inclination" class="font-semibold"
                      >${allPlanets[i].inclination? allPlanets[i].inclination.toFixed(2)+'°' : 'N/A'}</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Axial Tilt</span>
                    <span id="planet-axial-tilt" class="font-semibold"
                      >${allPlanets[i].axialTilt.toFixed(2)}°</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center py-2 border-b border-slate-700"
                  >
                    <span class="text-slate-400">Avg Temperature</span>
                    <span id="planet-temp" class="font-semibold">${allPlanets[i].avgTemp? allPlanets[i].avgTemp+'°C' : 'N/A'}</span>
                  </div>
                  <div class="flex justify-between items-center py-2">
                    <span class="text-slate-400">Escape Velocity</span>
                    <span id="planet-escape" class="font-semibold"
                      >${(allPlanets[i].escape/1000).toFixed(2)} km/s</span
                    >
                  </div>
                </div>`
        }}
        document.getElementById('orbital').innerHTML= car
}

}

// today in space section 
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('apod-date-input')
    const loadBtn = document.getElementById('load-date-btn')
    const todayBtn = document.getElementById('today-apod-btn')
    const loadingIndicator = document.getElementById('apod-loading')
    const apodImage = document.getElementById('apod-image')
    const apodVideo = document.getElementById('apod-video')
    const fullBtn = document.getElementById('fullBtn')
    const Shadow = document.getElementById('shadow')
    
    const todayDate = new Date().toISOString().split('T')[0]
    dateInput.max = todayDate
    dateInput.value = todayDate
    
    loadBtn.addEventListener('click', () => {
        const selectedDate = dateInput.value
        if (selectedDate > todayDate) {
            dateInput.value = todayDate;
            return;
        }
        fetchApodData(selectedDate);
    })
    
    todayBtn.addEventListener('click', () => {
        dateInput.value = todayDate
        fetchApodData(todayDate)
    })

    fetchApodData(todayDate);
    async function fetchApodData(D) {
        try {
            loadingIndicator.classList.remove('hidden')
            apodImage.classList.add('hidden')

            // Key = '6c3ZF1NunANwuArKjLoRvG9b5hlICb1taFLof9ye'
            const url = `https://api.nasa.gov/planetary/apod?api_key=6c3ZF1NunANwuArKjLoRvG9b5hlICb1taFLof9ye&date=${D}`

            const response = await fetch(url)
            const data = await response.json()

            document.getElementById('apod-date').innerText = `Astronomy Picture of the Day - ${data.date}`
            document.getElementById('apod-title').innerText = data.title
            document.getElementById('apod-explanation').innerText = data.explanation
            document.getElementById('apod-date-detail').innerHTML = `<i class="far fa-calendar mr-2"></i>${data.date}`
            document.getElementById('apod-date-info').innerText = data.date
            document.getElementById('apod-media-type').innerText = data.media_type
            document.querySelector('.date-input-wrapper span').innerText = data.date            
            const copyrightEl = document.getElementById('apod-copyright')
            if(data.copyright){
                copyrightEl.innerHTML = `&copy; ${data.copyright}`
                copyrightEl.classList.remove('hidden')
            }else{
                copyrightEl.classList.add('hidden')
            }

            if(data.media_type === 'image'){
                apodImage.src = data.url
                apodImage.classList.remove('hidden')
                apodVideo.classList.add('hidden')
                fullBtn.classList.remove('hidden')
                Shadow.classList.remove('hidden')
            }else if(data.media_type === 'video'){
                apodVideo.src = data.url
                apodImage.classList.add('hidden')
                apodVideo.classList.remove('hidden')
                fullBtn.classList.add('hidden')
                Shadow.classList.add('hidden')
            }

         }catch(error){
            console.error("Error fetching NASA APOD:", error)
            document.getElementById('apod-date').innerText = `Astronomy Picture of the Day - ${data.date}`
            document.getElementById('apod-title').innerText = data.title
            document.getElementById('apod-explanation').innerText = data.explanation
            document.getElementById('apod-date-detail').innerHTML = `<i class="far fa-calendar mr-2"></i>${data.date}`
            document.getElementById('apod-date-info').innerText = data.date
            document.getElementById('apod-media-type').innerText = data.media_type
            document.querySelector('.date-input-wrapper span').innerText = data.date 
        }finally{
            loadingIndicator.classList.add('hidden')
        }
    }
})

// launches section
let data = []
async function Launches(){
  let req  = await fetch('https://ll.thespacedevs.com/2.3.0/launches/upcoming/')
  let resp = await req.json();
  // console.log(resp.results[0])
  data = resp.results //.sort((a, b) => new Date(a.window_start) - new Date(b.window_start))
  let upLaunch = data[0]

  const featuredLaunch = document.getElementById('featured-launch')
  // handling data and time 
  const dateObj = new Date(upLaunch.window_start);
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true, 
    timeZone: 'UTC' 
  }
  let formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions) + " UTC"
  const dateOptions = { 
    weekday: 'long',
    month: 'long',
    day: 'numeric', 
    year: 'numeric', 
    timeZone: 'UTC'
  }
  let formattedDate = dateObj.toLocaleDateString('en-US', dateOptions)
  // console.log(formattedDate, formattedTime)


  let cart = ' '
  cart +=`<div
              class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
            >
              <div
                class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
              <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
                <div class="flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-3 mb-4">
                      <span
                        class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        <i class="fas fa-star"></i>
                        Featured Launch
                      </span>
                      <span
                        class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                      >
                        GO
                      </span>
                    </div>
                    <h3 class="text-3xl font-bold mb-3 leading-tight">
                      ${upLaunch.name}
                    </h3>
                    <div
                      class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                    >
                      <div class="flex items-center gap-2">
                        <i class="fas fa-building"></i>
                        <span>${upLaunch.launch_service_provider.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <i class="fas fa-rocket"></i>
                        <span>${upLaunch.rocket.configuration.name}</span>
                      </div>
                    </div>
                    <!-- <div
                      class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                    >
                      <i class="fas fa-clock text-2xl text-blue-400"></i>
                      <div>
                        <p class="text-2xl font-bold text-blue-400">2</p>
                        <p class="text-xs text-slate-400">Days Until Launch</p>
                      </div>
                    </div>-->
                    <div class="grid xl:grid-cols-2 gap-4 mb-6">
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-calendar"></i>
                          Launch Date
                        </p>
                        <p class="font-semibold">${formattedDate}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-clock"></i>
                          Launch Time
                        </p>
                        <p class="font-semibold">${formattedTime}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-map-marker-alt"></i>
                          Location
                        </p>
                        <p class="font-semibold text-sm">${upLaunch.pad.location.name}</p>
                      </div>
                      <div class="bg-slate-900/50 rounded-xl p-4">
                        <p
                          class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                        >
                          <i class="fas fa-globe"></i>
                          Country
                        </p>
                        <p class="font-semibold">${upLaunch.pad.country.name}</p>
                      </div>
                    </div>
                    <p class="text-slate-300 leading-relaxed mb-6">
                      ${upLaunch.mission.description}
                    </p>
                  </div>
                  <div class="flex flex-col md:flex-row gap-3">
                    <button
                      class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2"
                    >
                      <i class="fas fa-info-circle"></i>
                      View Full Details
                    </button>
                    <div class="icons self-end md:self-center">
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="far fa-heart"></i>
                      </button>
                      <button
                        class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors"
                      >
                        <i class="fas fa-bell"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="relative">
                  <div
                  class="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/50"
                  >
                    <!-- Placeholder image/icon since we can't load external images reliably without correct URLs -->
                    <img class="h-full w-full object-cover" src="${upLaunch.image.thumbnail_url || './assets/images/placeholder.webp'}" alt="launching rocket">

                  </div> 
                </div>
              </div>
            </div>`
        document.getElementById('featured-launch').innerHTML = cart  

        let remainingData = data.slice(1)
        // let remainingData = data;
        // console.log(remainingData[0])
        let carton = ' '
        for(let i=0; i<remainingData.length; i++){

          // console.log(remainingData.length)
          const dateObj = new Date(remainingData[i].window_start)
          let dateOptions2 = { 
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC'
          }
          let formattedDate2 = dateObj.toLocaleDateString('en-US', dateOptions2)
          let timeOptions2 = { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true, 
            timeZone: 'UTC' 
          }
          let formattedTime2 = dateObj.toLocaleTimeString('en-US', timeOptions2) + " UTC";
        //  حطهم واطبع بالايدي وعدل الداتا
        carton+=`<div
              class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
            >
              <div
                class="relative h-48 bg-slate-900/50 flex items-center justify-center"
              >
                <img class="object-cover w-full h-full" src=${remainingData[i]?.image?.thumbnail_url || "./assets/images/launch-placeholder.png"}  alt="launching image">
                <div class="absolute top-3 right-3">
                  <span
                    class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                  >
                    Go
                  </span>
                </div>
              </div>
              <div class="p-5">
                <div class="mb-3">
                  <h4
                    class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                  >
                    ${remainingData[i].name}
                  </h4>
                  <p class="text-sm text-slate-400 flex items-center gap-2">
                    <i class="fas fa-building text-xs"></i>
                    ${remainingData[i].launch_service_provider.name}
                  </p>
                </div>
                <div class="space-y-2 mb-4">
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-calendar text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedDate2}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-clock text-slate-500 w-4"></i>
                    <span class="text-slate-300">${formattedTime2}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-rocket text-slate-500 w-4"></i>
                    <span class="text-slate-300">${remainingData[i].rocket.configuration.name}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                    <span class="text-slate-300 line-clamp-1">${remainingData[i].pad.location.name}</span>
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 pt-4 border-t border-slate-700"
                >
                  <button
                    class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                  >
                    Details
                  </button>
                  <button
                    class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <i class="far fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>`
        }
        document.getElementById('launches-grid').innerHTML = carton

    // handling what to about to launch
    setInterval(() => {
      if (data.length > 0) {
        const now = new Date()
        const nextLaunchTime = new Date(data[0].window_start)
        if (now >= nextLaunchTime) {
          data.shift()
        }
      }
    }, 1000)
}
Launches()


