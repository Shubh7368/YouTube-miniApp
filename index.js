// API => "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=kgf&key=AIzaSyAjaRDeFRTqPbOHjsERMKeKJLfHCJFLDhI"

// Popular videos API =   'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyAjaRDeFRTqPbOHjsERMKeKJLfHCJFLDhI'

////////////////////////////////////////////////---------------------------------------
// ddefault videos on home page, just fetch new data and append using previous append function

let dafaultVideos = async () => {
    let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=20&key=AIzaSyAjaRDeFRTqPbOHjsERMKeKJLfHCJFLDhI`;
    
    let res = await fetch(url);
    let data = await res.json();
    
    //console.log(data.items);
    display(data.items); // calling our append fucntion here again
    
    }
    dafaultVideos();
    
    ///////////////////////////////////////////--------------------------------------------
    
    let q = ""; // storing query in a global vaariable
    // onclick function
    let search = async () => {
      const query = document.querySelector("#query").value;
      q = query;
     let data = await getData(query); // calling our fetch function with query as argument
    
       console.log(data)
     display(data); // calling our append fucntion here
    };
    
    
    // Fetch fucntionality
    
    let getData = async (query) => {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=AIzaSyAjaRDeFRTqPbOHjsERMKeKJLfHCJFLDhI`;
    
      let res = await fetch(url);
      let data = await res.json();
    
      return data.items;
       
    };
    
    
    // Append function
    
    let display = (data) => {
        const container = document.querySelector('#container');
        container.innerHTML = null;
    
        data.forEach((   {id:{videoId} , snippet:{title,thumbnails:{medium:{url}}} } ) => {
    // using -> OBJECT DESTRUCTURING
    
            const image = document.createElement('img');
            
              image.src = url; // here have to same key name as given in fetch data
    
            const name = document.createElement('h3');
            
             name.innerText = title;
    
            const box = document.createElement('div');
            box.setAttribute("class","video");
    
            // Event to pass, particular clicked video 
            box.onclick = () => {
    
                saveVideo( {id:{videoId},snippet:{title,thumbnails:{medium:{url}}}} ); // caliing our clicking on particular movie to watch
            }
    
    
            box.append(image,name);
            container.append(box);
    
        })
    }
    
    // store clicked Video, in localstorage and showing clicked video in a new page
    // As in next page we need data of that video, without this we can't show in next page
    let saveVideo = (data) => {
        localStorage.setItem("video",JSON.stringify(data));
        window.location.href = "video.html"; // to redirect to our next page after being clicked
    }
    
    
    // filter function , This only work for => Avenger query
    let filter = async ()=>{
        let data = await getData(q); // calling our fetch function with query as argument
        // here q is our storing that we have created in a global scope, 
        // and q = query, typed user
    
        data = data.filter((el)=>{ // here I taken any hard coded , id 
            return el.snippet.channelId === "UCCZeKW-ohu_TTlpK5KnYfRg"
        });
    
        display(data);
    };