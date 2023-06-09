const apiKey = "PUrCdpOrPadoQTLAhw8eY0vqtzjMw74k9cCRBky3";

// creating async function to get data

async function getData(url) {
  const request = await fetch(url);
  const data = await request.json();
  return data;
}

// creating function with 3 parameter to show info.

function displayData(photoUrl, title, description, status, containerId) {
  const container = document.getElementById(containerId);
  const photoCard = document.createElement("div");

  const pictureEl = document.createElement("img");
  pictureEl.classList.add("picture");
  pictureEl.src = photoUrl;

  const titleEL = document.createElement("h1");
  titleEL.textContent = `Rover : ${title}`;

  const descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;

  const statusEl = document.createElement("p");
  statusEl.textContent = `Rover status : ${status}`;

  photoCard.appendChild(pictureEl);
  photoCard.appendChild(titleEL);
  photoCard.appendChild(descriptionEl);
  photoCard.appendChild(statusEl);
  container.appendChild(photoCard);
}

// creating async function for get API details

async function getRoverPhoto(roverName, containerId) {
  const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=3000&api_key=${apiKey}`;
  try {
    const data = await getData(apiUrl);

    //creating array

    const photos = data.photos;

    // using slice for show only 5 photos

    const selectedPhotos = photos.slice(0, 5);

    // using forEach for add data to element info

    selectedPhotos.forEach((photo) => {
      const photoUrl = photo.img_src;
      const title = photo.rover.name;
      const description = photo.camera.full_name;
      const status = photo.rover.status;

      displayData(photoUrl, title, description, status, containerId);
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

getRoverPhoto("curiosity", "mars");
getRoverPhoto("opportunity", "mars2");
