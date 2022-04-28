import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import DataAboutList from "./data_about_list";
import { loadingIndicator } from "./transactions";

interface PropType {
  calculatedCount?: any;
  chartData: Array<any>;
  isHalfDonut: Boolean;
  colors: any;
  appliedFilter?: string;
  group?: string;
}
function InfoDetails(props: PropType) {
  let { chartData, isHalfDonut, appliedFilter, group, calculatedCount } = props;

  // group = group ?? "";
  let totalCols = Math.ceil(chartData.length / 3) + 1;
  let widthOfEachCol = Math.ceil(24 / totalCols);
  let uselessMap = [];
  const [chartValues, setchartValues] = useState({
    labels: [],
    values: [],
  });
  // const [counter, setCounter] = useState({
  //   id: "counter",
  //   beforeDraw(chart: any, args: any, options: any) {
  //     const {
  //       ctx,
  //       chartArea: { top, right, bottom, left, width, height },
  //     } = chart;
  //     ctx.save();
  //     ctx.font = "15px Roboto";
  //     ctx.textAlign = "center";
  //     ctx.font = "12px Roboto";
  //     ctx.color = "black";
  //     ctx.fillText("Total", width / 2, top + height / 2 + decideH1());
  //     ctx.font = "20px Roboto";
  //     ctx.fontStyle = "bold";
  //     ctx.fontWeight = "600";
  //     ctx.fillText(
  //       `${chartValues.totalCount}`,
  //       width / 2,
  //       top + height / 2 + decideH2()
  //     );
  //   },
  // });
  // const [width, setWidth] = useState<number>(window.innerWidth);

  for (let i = 0; i < totalCols - 1; i++) uselessMap.push(i);
  const decideH1 = () => {
    return isHalfDonut ? 30 : -5;
  };
  const decideH2 = () => {
    return isHalfDonut ? 45 : 15;
  };
  const donutData = {
    labels: chartValues.labels,
    legend: {
      display: false,
    },
    datasets: [
      {
        data: chartValues.values,
        backgroundColor: props.colors,
      },
    ],
  };
  useEffect(() => {
    let labels: any = [];
    let values: any = [];
    chartData.map((item) => {
      labels.push(item["legend"]);
      values.push(item["value"]);
    });
    const updateChartValue = {
      labels: labels,
      values: values,
    };
    setchartValues(updateChartValue);
  }, [chartData]);

  // useEffect(() => {
  //   forceUpdate();
  // }, [totalusers]);

  const buildDonut = () => {
    return (
      <Doughnut
        data={donutData}
        width={100}
        height={100}
        plugins={[
          {
            id: "counter",
            beforeDraw(chart: any, args: any, options: any) {
              const {
                ctx,
                chartArea: { top, width, height },
              } = chart;
              ctx.save();
              ctx.font = "15px Roboto";
              ctx.textAlign = "center";
              ctx.font = "10px Roboto";
              ctx.color = "black";
              ctx.fillText("Total", width / 2, top + height / 2 + decideH1());
              ctx.font = "16px Roboto";
              ctx.fontStyle = "bold";
              ctx.fontWeight = "600";
              ctx.fillText(
                `${calculatedCount}`,
                width / 2,
                top + height / 2 + decideH2()
              );
            },
          },
        ]}
        options={{
          rotation: isHalfDonut ? -90 : undefined,
          circumference: isHalfDonut ? 180 : undefined,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    );
  };

  // function handleWindowSizeChange() {
  //   setWidth(window.innerWidth);
  // }
  // useEffect(() => {
  //   window.addEventListener("resize", handleWindowSizeChange);
  //   return () => {
  //     window.removeEventListener("resize", handleWindowSizeChange);
  //   };
  // }, []);
  // function generateDonut(donutData: any, size: any) {
  //   return (
  //     <Doughnut
  //       data={donutData}
  //       width={size}
  //       height={size}
  //       plugins={[
  //         {
  //           id: "counter",
  //           beforeDraw(chart: any, args: any, options: any) {
  //             console.log("BEFORE DRAW = ");
  //             const {
  //               ctx,
  //               chartArea: { top, right, bottom, left, width, height },
  //             } = chart;
  //             ctx.save();
  //             ctx.font = "15px Roboto";
  //             ctx.textAlign = "center";
  //             ctx.font = "10px Roboto";
  //             ctx.color = "black";
  //             ctx.fillText("Total", width / 2, top + height / 2 + decideH1());
  //             ctx.font = "16px Roboto";
  //             ctx.fontStyle = "bold";
  //             ctx.fontWeight = "600";
  //             ctx.fillText(`${223}`, width / 2, top + height / 2 + decideH2());
  //           },
  //         },
  //       ]}
  //       options={{
  //         rotation: isHalfDonut ? -90 : undefined,
  //         circumference: isHalfDonut ? 180 : undefined,
  //         maintainAspectRatio: false,
  //         plugins: {
  //           legend: {
  //             display: false,
  //           },
  //         },
  //       }}
  //     />
  //   );
  // }

  let smallDashboard = (
    <div>
      <Row align="middle">
        {uselessMap.map((x, i) => {
          return (
            <Col span={Math.ceil(24 / (totalCols - 1))}>
              <DataAboutList
                appliedFilter={appliedFilter ?? "All"}
                data={[...chartData.slice(3 * i, 3 * i + 3)]}
                colors={props.colors.slice(3 * i, 3 * i + 3)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );

  let bigDashboard = (
    <div>
      <Row align="middle">
        <Col span={widthOfEachCol - 2}>{buildDonut()}</Col>
        {uselessMap.map((x, i) => {
          return (
            <Col span={widthOfEachCol}>
              <DataAboutList
                appliedFilter={appliedFilter ?? "All"}
                data={[...chartData.slice(3 * i, 3 * i + 3)]}
                colors={props.colors.slice(3 * i, 3 * i + 3)}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );

  return chartValues.labels.length !== 0 ? (
    <div>
      <div className="big-dashboard">{bigDashboard}</div>
      <div className="small-dashboard">{smallDashboard}</div>
    </div>
  ) : (
    loadingIndicator
  );
}
export default InfoDetails;
