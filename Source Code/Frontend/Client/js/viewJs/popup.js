function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function showPopup(text){
    document.getElementById("popupname").innerHTML = text;
    document.getElementById("myForm").style.display = "block";
    setTimeout(function(){
		document.getElementById("myForm").style.display = "none";
	},3000);
}

