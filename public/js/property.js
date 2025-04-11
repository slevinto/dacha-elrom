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
    
    $.get("https://docs.google.com/document/d/1JI6N6Kh88Kj8dplZnNofuuyphYPVB2um4YXvqoKWR9o/edit?usp=sharing").success(function(details){ 
            
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

        let currentZimmerDetails = searchParams.get('property') == 'Botz' ? zimmerDetails[1] : zimmerDetails[0];
        currentZimmerDetails.sale.forEach((element) =>
        {
          $('#sale').append('<p style="margin: 10px">' + element + '</p>');
        });

        $("#title")[0].innerText = currentZimmerDetails.title;
        $("#guests")[0].innerText = currentZimmerDetails.guestsNumber;
        $("#price")[0].innerText = "  מחיר: " + currentZimmerDetails.price + " \u20AA " + " לזוג " ;
        $("#price2")[0].innerText =  "בן אדם נוסף מגיל שנתיים 100 " + "\u20AA"; 
        $("#rule")[0].innerText = "הגעה מ 15:00, עזיבה עד 11:00";
        $("#bed")[0].innerText = currentZimmerDetails.bed;        

        if (searchParams.get('property') == 'Botz')    
        {
          $("#Etz")[0].style.display = 'none';
        }  
        
        if (searchParams.get('property') == 'Etz')
        {
          $('#fireplace')[0].style.display = 'none';
          $("#Botz")[0].style.display = 'none';
        } 

        //load_ics(searchParams.get('property'));
        add_recur_events();
    
        $("#loader").hide();

        tns({
          container: '.zimmer' + searchParams.get('property'),            
          autoplay: true,
          speed: 1000,
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