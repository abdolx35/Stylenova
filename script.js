const productsDB = {
   casual: [
  {name: "Oversized T-Shirt", price: "350 EGP", img: "casual1.jpg"},
  {name: "Baggy Jeans", price: "700 EGP", img: "casual2.jpg"},
  {name: "White Sneakers", price: "1200 EGP", img: "casual3.jpg"}
],
    sporty: [
      {name: "Sport T-Shirt", price: "400 EGP", img: "sporty1.jpg"},
      {name: "Training Pants", price: "650 EGP", img: "sporty2.jpg"},
      {name: "Running Shoes", price: "1500 EGP", img: "sporty3.jpg"}
    ],
    classic: [
      {name: "Formal Shirt", price: "500 EGP", img: "classic1.jpg"},
      {name: "Black Pants", price: "800 EGP", img: "classic2.jpg"},
      {name: "Leather Shoes", price: "1800 EGP", img: "classic3.jpg"}
    ]
  };
  
  function goTo(num){
    document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
    document.getElementById("screen"+num).classList.add("active");
  }
  
  function startCamera(){
    navigator.mediaDevices.getUserMedia({video:true})
    .then(stream=>{
      document.getElementById("video").srcObject=stream;
      document.getElementById("camStatus").innerText="Scanning...";
    })
    .catch(()=>{
      document.getElementById("camStatus").innerText="Camera blocked";
    });
  }
  
  let detectedStyle = "";

function analyze(){
  goTo(3);
  setTimeout(generateResult,2500);
}

function generateResult(){
  const styles=["casual","sporty","classic"];
  detectedStyle=styles[Math.floor(Math.random()*styles.length)];

  goTo(4);

  const preview=document.getElementById("aiPreview");

  preview.src="ai-"+detectedStyle+".jpg";
}
  
  function displayProducts(style){
    const box=document.getElementById("products");
    box.innerHTML="";
    productsDB[style].forEach(p=>{
      box.innerHTML+=`
        <div class="product-card">
          <img src="${p.img}">
          <h3>${p.name}</h3>
          <p>${p.price}</p>
        </div>
      `;
    });
  }

  function goToProducts(){
    goTo(5);
  
    document.getElementById("styleTitle").innerText="Detected Style: "+detectedStyle.toUpperCase();
    document.getElementById("aiMessage").innerText="Our AI styled you perfectly 🔥";
  
    displayProducts(detectedStyle);
    applyTheme(detectedStyle);
  }
  
  function applyTheme(style){
    if(style==="casual") document.body.style.background="#F3F9FF";
    if(style==="sporty") document.body.style.background="#F1FFF5";
    if(style==="classic") document.body.style.background="#FFF8F0";
  }
  
  function resetApp(){
    document.body.style.background="#ffffff";
    goTo(1);
  }
