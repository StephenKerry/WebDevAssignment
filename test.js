

 // Populate clock select options with images
 const clockOptionsContainer = document.querySelector("#clock-options");
 if (clockOptionsContainer.innerHTML.trim() === '') {
     clocks.forEach(clock => {
         const optionDiv = document.createElement("div");
         const image = document.createElement("img");
         image.src = `images/${clock.image}`; // Corrected image path
         image.alt = clock.name;
         optionDiv.appendChild(image);

         const select = document.createElement("select");
         select.id = `clock${clock.id}`;
         // Populate select options
         clock.features.forEach((feature, index) => {
             const option = document.createElement("option");
             option.value = index;
             option.textContent = feature;
             select.appendChild(option);
         });
         optionDiv.appendChild(select);
         clockOptionsContainer.appendChild(optionDiv);
     });
 }

 // Function to show/hide more information
 const showHide1 = () => {
     let readMoreDiv = document.querySelector(".more1");
     if (readMoreDiv.style.display === "block") {
         readMoreDiv.style.display = "none";
         btn1.textContent = "Read More..."
     } else {
      setTimeout(() => {
        readMoreDiv.style.display = "block";
        btn1.textContent = "Read Less...";
      }, 2000); // Delay of 2000 milliseconds (2 seconds)
    }
}

 // Event listener for "Read More" button
 let btn1 = document.querySelector('.btn1');
 btn1.addEventListener('click', showHide1);