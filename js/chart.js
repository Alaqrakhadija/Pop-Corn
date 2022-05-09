//variable for selection chart
const typeselection = document.querySelector('.data');

typeselection.addEventListener('change', async(e) => {

    if (typeselection.value === 'data')
        window.location = `/charts`;
    else {
        var title = `Movies ${typeselection.value}`;
        let queryString = `http://localhost:3000/loadchart?data=${typeselection.value}`;
        const res = await fetch(queryString).then(res => res.json());
        if (typeselection.value === 'rating')
            piechart(res.msg, title);
        else
            Funnelchart(res.msg, typeselection.value, title);

    }


})

function piechart(datapoint, title) {
    var options = {
        title: {
            text: title
        },

        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}",
            dataPoints: datapoint
        }]
    };
    $("#chartContainer").CanvasJSChart(options);
}

function Funnelchart(datapoint, xaxis, title) {
    var options = {
        animationEnabled: true,
        theme: "light2", //"light1", "light2", "dark1", "dark2"
        title: {
            text: title
        },
        data: [{
            type: "funnel",
            toolTipContent: "<b>{label}</b>: {y} <b>({y})</b>",
            indexLabel: "{label} ({y})",
            dataPoints: datapoint
        }]
    };

    $("#chartContainer").CanvasJSChart(options);
}