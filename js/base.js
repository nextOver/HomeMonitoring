FusionCharts.ready(function(){
      var chartObj = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    renderAt: 'chart-container',
    width: '350',
    height: '370',
    dataSource: {
        "chart": {
            "theme": "fusion",
            "caption": "",
            "subcaption": "",
            "lowerLimit": "0",
            "upperLimit": "2000",
            "lowerLimitDisplay": "Vazio",
            "upperLimitDisplay": "Cheio",
            "numberSuffix": " Litros",
            "showValue": "1",
            "chartBottomMargin": "45",
            "showValue": "0",
            "dataStreamUrl": "api.php?function=getValue",
            "refreshInterval": "2",
            "refreshInstantly": "1",
            "cylFillColor": "#35d1fd",
            "cyloriginx": "125",
            "cyloriginy": "270",
            "cylradius": "120",
            "cylheight": "250",
            "showToolTip": "0"
        },

        "annotations": {
            "origw": "400",
            "origh": "290",
            "autoscale": "1",
            "groups": [{
                "id": "range",
                "items": [{
                    "id": "rangeBg",
                    "type": "rectangle",
                    "x": "$canvasCenterX-75",
                    "y": "$chartEndY-40",
                    "tox": "$canvasCenterX +55",
                    "toy": "$chartEndY-80",
                    "fillcolor": "#35d1fd"
                }, {
                    "id": "rangeText",
                    "type": "Text",
                    "fontSize": "20",
                    "fillcolor": "#333333",
                    "text": "Loading...",
                    "x": "$chartCenterX-60",
                    "y": "$chartEndY-60"
                }]
            }]
        }

    },
    "events": {
        "rendered": function(evtObj, argObj) {
            //35d1fc   blue color
            //var fuelVolume = 110;
            evtObj.sender.chartInterval = setInterval(function() {
                //(fuelVolume < 10) ? (fuelVolume = 80) : "";
                //var consVolume = fuelVolume - (Math.floor(Math.random() * 3));
                //evtObj.sender.feedData && evtObj.sender.feedData("&value=" + consVolume);
               // fuelVolume = consVolume;
          evtObj.sender.feedData && evtObj.sender.feedData("&value=");
            }, 2000);
        },
        //Using real time update event to update the annotation
        //showing available volume of Diesel
        "realTimeUpdateComplete": function(evt, arg) {
            var annotations = evt.sender.annotations,
                dataVal = evt.sender.getData(),
                colorVal = (dataVal >= 1000) ? "#6caa03" : ((dataVal <= 500) ? "#e44b02" : "#f8bd1b");
            //Updating value
            annotations && annotations.update('rangeText', {
                "text": dataVal + " Litros"
            });
            //Changing background color as per value
            annotations && annotations.update('rangeBg', {
                "fillcolor": colorVal
            });

        },
        "disposed": function(evt, arg) {
            clearInterval(evt.sender.chartInterval);
        }
    }
}
);
      chartObj.render();
    });




$(function()
{
         // Set up a function to update your label using the counter (every 1000ms or 1s)
         setInterval(function()
         {
          $.ajax({
              url:"api.php?function=getServiceState",
                  success:function(result)
                  {
                       var obj = JSON.parse(result);
                      if (obj.service_status == 'inactive')
                      {
                         $('#info').html('<div class="text-danger"><h4><i class="fa fa-times fa-lg"></i> Inactive </h4></div>');
                      }

                      if (obj.service_status == 'active')
                      {
                        $('#info').html('<div class="text-success"><h4><i class="fa fa-check-circle-o fa-lg"></i> Running </h4></div>');
                      }

                      $('#system').html('<div class="text-secondary">Memória total: '+ obj.mem_total +' / Memória usada: '+ obj.mem_usage +'</div>');
                      $('#last_update').html('<div class="text-secondary">Última atualização: '+obj.last_update+'</div>');
                      $('#uptime').html('<div class="text-secondary">Uptime: '+obj.uptime+'</div>');
                      if (obj.last_update ) {} 
                }
            });                       
         },2000);
});