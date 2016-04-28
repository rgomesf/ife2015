
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
        
        var keys = Object.keys(resultsMap),i, len = keys.length;
        keys.sort();
        for (i = 0; i < len; i++) {
           var speciality=keys[i];
           var list=resultsMap[k]
        //}
        //for (x in resultsMap) {
        //    var speciality=x;
        //    var list=resultsMap[x];
            var numberOfC=list.length;
            
            var snip1='<li><div class="collapsible-header"><i class="material-icons">'+icon+'</i>'+speciality+'<span class="badge">'+numberOfC+'</span></div>'+
            '<div class="collapsible-body"><ul class="collection">';
            
            var snip3='</ul></div></li>';
            
            var snip2='';
            
            for (j = 0; j < numberOfC; j++) {
                
                if (useSpeciality)
                {
                     snip2=snip2+'<li class="collection-item">'+list[j].INSTITUIÇÃO+" <b>"+list[j].ORDEM+"</b> ("+list[j].PNS+")"+'</li>';
                }
                else
                {
                     snip2=snip2+'<li class="collection-item"><b>'+list[j].ESPECIALIDADE+" <b>"+list[j].ORDEM+"</b> ("+list[j].PNS+")"+'</li>';
                }
               
            }
            $('.results').append(snip1+snip2+snip3);
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
