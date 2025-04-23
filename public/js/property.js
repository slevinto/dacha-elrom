/*function add_recur_events() {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events);  
}*/
      
/*function load_ics(property){
  $.get("/getCalendar", function(result){
    $('#calendar').fullCalendar('addEventSource', fc_events(result, {color: "#F87171"}))
  });  
}*/
    
$(document).ready(function() {    

    /*$('#calendar').fullCalendar({
        header: {
            left: 'next,prev',            
        },
        defaultView: 'month',
        firstDay: '1',
        locale: 'he',
        lang: 'he',
        editable: false,
        eventLimit: true, 
        contentHeight: 250, 
        displayEventTime : false,
        eventConstraint: {
            start: moment().format('YYYY-MM-DD'),
            end: '2100-01-01' 
        }
    });*/   

    let searchParams = new URLSearchParams(window.location.search);  
    
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
        
        zimmerDetails.sale.forEach((element) =>
        {
          $('#sale').append('<p style="margin: 10px; color:red;">' + element + '</p>');
        });

        $("#title")[0].innerText = zimmerDetails.title;
        
        $("#occupancy").append('<div class="flex items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; ">' + 
          zimmerDetails.occupancy.title + 
          '</p><p style="margin-right: 10px;">' 
          + zimmerDetails.occupancy.description  + '</p></div>'); 

        var appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; ">מחירים:</p>';
        zimmerDetails.prices.forEach((element) =>
        {
          appendString = appendString + '<p style="font-size: 16px;">' + element.category + " - " + element.price + '</p>';          
        });
        appendString = appendString + '</div>';
        $("#price").append(appendString);
        
        appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; ">זמני אירוח:</p>';
        zimmerDetails.timearrival.forEach((element) =>
        {
          appendString = appendString + '<p style="font-size: 16px;">' + element + '</p>';          
        });
        appendString = appendString + '</div>';
        $("#timearrival").append(appendString);

        appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; ">מקומות שינה בכל יחידה:</p>';
        zimmerDetails.bed.forEach((element) =>
        {
          appendString = appendString + '<p style="font-size: 16px;">' + element + '</p>';          
        });  
        appendString = appendString + '</div>';
        $("#bed").append(appendString);
        
        appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; "> אבזור ונוחות:</p>';
        zimmerDetails.accessories.forEach((element) =>
        {
            appendString = appendString + '<p style="font-size: 16px;">' + element + '</p>';        
        });
        appendString = appendString + '</div>';
        $("#accessories").append(appendString);

        appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; "> מטבחון מאובזר בכל יחידה:</p>';
        zimmerDetails.kitchen.forEach((element) =>
        {
          appendString = appendString + '<p style="font-size: 16px;">' + element + '</p>';           
        });
        appendString = appendString + '</div>';
        $("#kitchen").append(appendString);

        appendString = '<div class="items-center justify-end" style="white-space: nowrap"><p style="font-size: 20px; ">פינת ישיבה חיצונית:</p>';
        zimmerDetails.outdoor.forEach((element) =>
        {
          appendString = appendString + '<p style="font-size: 16px;">' + element + '</p>';        
        });
        appendString = appendString + '</div>';
        $("#outdoor").append(appendString);

        //load_ics(searchParams.get('property'));
        //add_recur_events();
    
        $("#loader").hide();

        tns({
          container: '.zimmer',            
          autoplay: true,
          speed: 50,
          autoplayButtonOutput: false,
          mouseDrag: true,
          gutter: 15,
          nav: false,            
          controls: false, 
          responsive: {
            320: {
              items: 1
            }, 
            640: {
              items: 3
            }
          }  
        });        
    });
})