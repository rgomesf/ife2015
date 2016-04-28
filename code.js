
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
    
    $('.list').DataTable( {
    data: actual_JSON,
    columnDefs: [
            {
                targets: [ 3,4,5],
                className: 'mdl-data-table__cell--non-numeric'
            }
        ],
    columns: [
        { data: 'ORDEM', title:'Ordem' },
        { data: 'PNS', title:'PNS'  },
        { data: 'NOTA', title:'Nota'  },
        { data: 'ESPECIALIDADE', title:'Especialidade',className: 'mdl-data-table__cell--non-numeric'  },
        { data: 'INSTITUIÇÃO', title:'Instituição',className: 'mdl-data-table__cell--non-numeric'  },
        { data: 'ARS', title:'ARS',className: 'mdl-data-table__cell--non-numeric'  }
    ]
} );
    });
});
