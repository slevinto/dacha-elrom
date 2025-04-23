$(document).ready(function() {    

  accessibility_rtl = true;
  pixel_from_side = 10;
  pixel_from_start = 50;
  
  window.onscroll = function () {
      var backToTop = document.querySelector(".back-to-top");
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTop.style.display = "flex";
      } else {
        backToTop.style.display = "none";
      }      
  };

  $.get("https://docs.google.com/document/d/1EqHSTo6QGvcTFWmVeanfG4u4lDTK_zkbJhYCss8YG4o/edit?tab=t.0#heading=h.7vee84u06gq4").success(function(details){ 
      let zimmerDetails;
      if (window.matchMedia("(max-width: 767px)").matches)  // this is mobile device
      {   
        zimmerDetails = JSON.parse($(details).find("div")[0].innerText.replace(/\u00A0/g, ' '));
      }
      else  // this is tablet or desktop device
      {   
        $(details).each((index, element) =>
        {
            if (element.innerText.startsWith("DOCS_modelChunk "))
                zimmerDetails = JSON.parse(JSON.parse(element.innerText.split("DOCS_modelChunk = ")[1].split(';')[0])[0].s);
        });          
      } 
      if ($("#title1")[0] != null)
        $("#title1")[0].innerText = zimmerDetails.title1;
      $('#title2').append('<p style="margin-right: 5px;margin-left: 5px;">' + zimmerDetails.title2 + '</p>');          
      zimmerDetails.title3.forEach((element) =>
      {
        $('#title3').append('<p style="margin-top: 15px"><strong>' + element + '</strong></p>');          
      });        
  });
  

})

function getProperty() {
  window.location = "/property";  
}


