url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

function init() {
    let dropDown = d3.select("#selDataset");
    d3.json(url).then((data) => {
        let names = data.names;
        names.forEach((id) => {
            dropDown.append("option").text(id).property("value", id)
        });
    let first = names[0];
    metaData(first);
    barChart(first);
    bubbleChart(first);
    });
};

function metaData(info) {
    d3.json(url).then((data) => {
        let meta = data.metadata;
        let values = meta.filter(result => result.id == info);
        let thing = values[0];
        console.log(thing);
        d3.select("#sample-metadata").html("");
        Object.entries(thing).forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

function barChart(info) {
    d3.json(url).then((data) => {
        let array = data.samples;
        let values = array.filter(result => result.id == info);
        let sample_1 = values[0];
        let otu_ids = sample_1.otu_ids;
        let otu_label = sample_1.otu_labels;
        let sample_values = sample_1.sample_values;
        let ydata = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xdata = sample_values.slice(0,10).reverse();
        let label = otu_label.slice(0,10).reverse();


        let layout = {
            title: "Top OTUs"
        };

        let trace = [{
            x: xdata,
            y: ydata,
            text: label,
            type: "bar",
            orientation: 'h'
        }];
        Plotly.newPlot("bar", trace, layout)
    });
};


function bubbleChart(info) {
    d3.json(url).then((data) => {
        let array = data.samples;
        let values = array.filter(result => result.id == info);
        let sample_1 = values[0];
        let otu_ids = sample_1.otu_ids;
        let otu_label = sample_1.otu_labels;
        let sample_values = sample_1.sample_values;
        console.log(sample_values);
        console.log(otu_ids);

        let layout = {
            title: "Bacteria per Sample",
            xaxis: {title: "OTU ID"},
            text: otu_label
        };

        let trace = [{
            x: otu_ids,
            y: sample_values,
            text: otu_label,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "magma"
            }
        }];
        Plotly.newPlot("bubble", trace, layout)
    });    
};

function optionChanged(info) {
    metaData(info);
    barChart(info);
    bubbleChart(info);
};

init();