
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
            noty({type: 'error',timeout: 3000,layout: 'top',text: 'O número introduzido não é inválido. Experimenta por exemplo: 403'});
        }
        else
        {
            $('.results').empty();
           var resultset=[];
           
        var resultsMap={};
           
           
       for (i = 0; i < actual_JSON.length; i++) {
            var candidate=actual_JSON[i];
            
            if (candidate.ORDEM>=numberSelected)
            {
                if (!resultsMap[candidate.ESPECIALIDADE])
                {
                    resultsMap[candidate.ESPECIALIDADE]=[];
                }
                resultsMap[candidate.ESPECIALIDADE].push(candidate);
                resultset.push(candidate);
            }
        }
        
        for (x in resultsMap) {
            var speciality=x;
            var list=resultsMap[x];
            var numberOfC=list.length;
            
            $('.results').append("<div>"+speciality+"("+numberOfC+")</div>");
    }
        
        
        
        
        
        var n = noty({type: 'success',timeout: 3000,layout: 'top',text: 'Resultados gerados com sucesso'});
        console.log(resultset); 
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
