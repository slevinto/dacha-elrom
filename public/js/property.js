function add_recur_events() {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events);  
}
      
/*function load_ics(property){
  $.get("/getCalendar?property=" + property, function(result){
    $('#calendar').fullCalendar('addEventSource', fc_events(result, {color: "#F87171"}))
  });  
}*/
    
$(document).ready(function() {    

    $("#loader").show();

    $('#calendar').fullCalendar({
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
    });   

    let searchParams = new URLSearchParams(window.location.search);  
    
    $.get("https://docs.google.com/document/d/1P5O9apcERrO1yG0YphH58jl_6Lf5Ck9HwcZTLM4HRl4/edit?usp=sharing").success(function(details){ 
            
        let zimmerDetails;
        if (window.matchMedia("(max-width: 767px)").matches)  // this is mobile device
        {   
          zimmerDetails = JSON.parse($(details).find("div")[0].innerText);
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
          $('#sale').append('<p style="margin: 10px">' + element + '</p>');
        });

        $("#title")[0].innerText = zimmerDetails.title;
        $("#guests")[0].innerText = zimmerDetails.guestsNumber;
        $("#price")[0].innerText = "  מחיר: " + zimmerDetails.price;
        $("#rule")[0].innerText = "הגעה מ 15:00, עזיבה עד 11:00";
        $("#bed")[0].innerText = zimmerDetails.bed;        

        
        //load_ics(searchParams.get('property'));
        add_recur_events();
    
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