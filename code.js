
function loadJSON(file,callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

$(document).ready(function() {
    loadJSON('2015.json',function(response) {
    var actual_JSON = JSON.parse(response);
    
    $('.generate').on("click",function()
    {
        var numberSelected=Number($('.order').val());
        
        if (!(numberSelected>0))
        {
            Materialize.toast('O número introduzido não é inválido.', 4000)
        }
        else
        {
            $('.results').empty();
           var resultset=[];
           
        var resultsMap={};
        var useSpeciality=true;
        var icon="location_city";
        if ($('#institution').is(':checked')) {
            useSpeciality=false;
            icon="airline_seat_recline_normal";
        }
           
           
       for (i = 0; i < actual_JSON.length; i++) {
            var candidate=actual_JSON[i];
            
            if (candidate.ORDEM>=numberSelected && candidate.ESPECIALIDADE!="")
            {
                if (useSpeciality)
                {
                    if (!resultsMap[candidate.ESPECIALIDADE])
                    {
                        resultsMap[candidate.ESPECIALIDADE]=[];
                    }
                    resultsMap[candidate.ESPECIALIDADE].push(candidate);  
                }
                else
                {
                    if (!resultsMap[candidate['INSTITUIÇÃO']])
                    {
                        resultsMap[candidate['INSTITUIÇÃO']]=[];
                    }
                    resultsMap[candidate['INSTITUIÇÃO']].push(candidate);  
                }
                resultset.push(candidate);
            }
        }
        
        
        
        for (x in resultsMap) {
            var speciality=x;
            var list=resultsMap[x];
            var numberOfC=list.length;
            
            var snip='<li><div class="collapsible-header"><i class="material-icons">'+icon+'</i>'+speciality+'<span class="badge">'+numberOfC+'</span></div>'+
            '<div class="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div></li>'
            $('.results').append(snip);
    }
        
        
        
        $('.results').collapsible({
            accordion : false
        });
        Materialize.toast('Resultados gerados com sucesso!', 4000)
        }

    });
    
    
    /*
    $('.list').DataTable( {
    data: actual_JSON,
    columnDefs: [
            {
                targets: [ 3,4,5],
                className: 'mdl-data-table__cell--non-numeric'
            },
             { width: '10%', targets: [0,1,2] },
             { width: '20%', targets: 3 },
             { width: '40%', targets: 4 },
             { width: '20%', targets: 5 }
        ],
    columns: [
        { data: 'ORDEM', title:'Ordem' },
        { data: 'PNS', title:'PNS'  },
        { data: 'NOTA', title:'Nota'  },
        { data: 'ESPECIALIDADE', title:'Especialidade'},
        { data: 'INSTITUIÇÃO', title:'Instituição' },
        { data: 'ARS', title:'ARS'}
    ]
} );*/
    });
});
