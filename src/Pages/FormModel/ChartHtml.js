import React, { useState, useEffect } from 'react';
const $ = window.$;
export default function ChartHtml(props) {
    let [model, setModel] = useState({ ...props });
    function initChart() {
        window.Chart.defaults.global.defaultFontFamily = "'IRANSans','Tahoma', 'sans-serif'";
        //it is used in Model.RenderedChart
        let color = window.Chart.helpers.color;
        //this will render chartData variable.
        let chartData = null;
        try {
            eval('chartData = ' + model.RenderedChart);
            var ctx = document.getElementById(model.Id).getContext('2d');

            new window.Chart(ctx, {
                type: model.ChartTypeName.toLowerCase().replace("area", "line"),
                data: chartData,
                options: {
                    responsive: true,
                    legend: {
                        display: model.DisplayLegend,
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: model.Label
                    }
                }
            });
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        initChart();
    });

    window['ChartUpdateItems' + model.Id] = function (data) {
        setModel({ ...data });
    };
    return (
        <React.Fragment>
            {
                //is not ButtonHtml.e_subtype.submit
                (model != null && model.Visibility != false) &&
                <div className="bpms-control-container" id={"divChart_" + model.Id} >
                    <div className="input-group">
                        <canvas id={model.Id} name={model.Id} className={model.CssClass} data-parameter={model.Parameter} data-type={model.Type} data-chartdataset={model.ChartDataSet}
                            data-charttype={model.ChartType} data-formid={model.DynamicFormID}  ></canvas>
                    </div>
                </div>
            }

        </React.Fragment>
    );
}


