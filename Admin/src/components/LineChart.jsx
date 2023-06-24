import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data22 } from "../data/mockData";
import { makeRequest } from "../axios";
import { useQuery } from 'react-query'
import { useEffect, useState } from "react";
import moment from 'moment'

const LineChart = (props) => {
    const { isCustomLineColors = false,
        setTotalVeterinarian,
        setTotalPet,
        setTotalPost ,
        setLastMonthData,
        setTwoMonthsAgoData,
        isDashboard = false,
        setLastMonthAmountUser,
        setTwoMonthAmountUser,
        setTotalUser,
        setLastMonthAmountVeterinarian,
        setTwoMonthAmountVeterinarian,
        setLastMonthAmountPet,
        setTwoMonthAmountPet,
         } = props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  
  const postData = useQuery({
      queryKey: ["posts"],
      queryFn: () =>
      makeRequest.get("/posts/getAll").then((res) => {
          return res.data;
        }),
    },
    );
    const userData = useQuery({
        queryKey: ["users"],
        queryFn: () =>
        makeRequest.get("/user/getAll").then((res) => {
            return res.data;
          }),
      },
      );
      const veterinarianData = useQuery({
        queryKey: ["veterinarian"],
        queryFn: () =>
        makeRequest.get("/veterinarian/getList?status=1").then((res) => {
            return res.data;
          }),
      },
      );
      const petData = useQuery({
        queryKey: ["pet"],
        queryFn: () =>
        makeRequest.get("/pet/getAll").then((res) => {
            return res.data;
          }),
      },
      );

    const [data, setData] = useState([])
    
    useEffect(() => {
        if (postData.isSuccess) {
          const countByMonth = {};
          const countByDate = {}
          const lastMonth = moment().subtract(1, 'month');
          const lastMonthFormatted = lastMonth.format("MM/YYYY");
          const twoMonthsAgo = moment().subtract(2, 'month');
          const twoMonthsAgoFormatted = twoMonthsAgo.format("MM/YYYY");
          setTotalPost(postData.data.length)
          postData.data.forEach((item) => {
            const formattedMonth = moment(item.date_create);
            const isLastMonth = formattedMonth.isSame(lastMonth, 'month');
            const isTwoMonthsAgo = formattedMonth.isSame(twoMonthsAgo, 'month');
            if (isLastMonth || isTwoMonthsAgo) {
                const month = formattedMonth.format("MM/YYYY");
                if (countByMonth[month]) {
                  countByMonth[month] += 1;
                } else {
                  countByMonth[month] = 1;
                }
                
              }

              const formattedDate = moment(item.date_create).format("DD/MM");
                      if (countByDate[formattedDate]) {
                        countByDate[formattedDate] += 1;
                      } else {
                        countByDate[formattedDate] = 1;
                      }

            
          });
      
          const newData = Object.entries(countByDate).map(([x, y]) => ({
            x,
            y,
          }));
          
          // Sắp xếp newData theo thứ tự ngày tăng dần
          newData.sort((a, b) => moment(a.x, "DD/MM").valueOf() - moment(b.x, "DD/MM").valueOf());
      
          setData((prevDataPost) => [
            ...prevDataPost,
            {
              id: "post",
              color: tokens("dark").greenAccent[500],
              data: newData,
            },
          ]);
      
          const lastMonthData = countByMonth[lastMonthFormatted] || 0;
          const twoMonthsAgoData = countByMonth[twoMonthsAgoFormatted] || 0;
          setLastMonthData(lastMonthData);
          setTwoMonthsAgoData(twoMonthsAgoData);
        
        }
      }, [postData.isSuccess]);
      useEffect(() => {
        if (userData.isSuccess) {
          const countByDate = {};
          const lastMonth = moment().subtract(1, 'month');
          const lastMonthFormatted = lastMonth.format("MM/YYYY");
          const twoMonthsAgo = moment().subtract(2, 'month');
          const twoMonthsAgoFormatted = twoMonthsAgo.format("MM/YYYY");
          setTotalUser(userData.data.length)
          userData.data.forEach((item) => {
            const formattedDate = moment(item.date_create);
            const isLastMonth = formattedDate.isSame(lastMonth, 'month');
            const isTwoMonthsAgo = formattedDate.isSame(twoMonthsAgo, 'month');
      
            if (isLastMonth || isTwoMonthsAgo) {
              const month = formattedDate.format("MM/YYYY");
              if (countByDate[month]) {
                countByDate[month] += 1;
              } else {
                countByDate[month] = 1;
              }
            }
          });

          const lastMonthData = countByDate[lastMonthFormatted] || 0;
          const twoMonthsAgoData = countByDate[twoMonthsAgoFormatted] || 0;
          setLastMonthAmountUser(lastMonthData);
          setTwoMonthAmountUser(twoMonthsAgoData)
        }
      }, [userData.isSuccess]);
      useEffect(() => {
        if (veterinarianData.isSuccess) {
          const countByDate = {};
          const lastMonth = moment().subtract(1, 'month');
          const lastMonthFormatted = lastMonth.format("MM/YYYY");
          const twoMonthsAgo = moment().subtract(2, 'month');
          const twoMonthsAgoFormatted = twoMonthsAgo.format("MM/YYYY");
          setTotalVeterinarian(veterinarianData.data.length)
          veterinarianData.data.forEach((item) => {
            const formattedDate = moment(item.created_at);
            const isLastMonth = formattedDate.isSame(lastMonth, 'month');
            const isTwoMonthsAgo = formattedDate.isSame(twoMonthsAgo, 'month');
      
            if (isLastMonth || isTwoMonthsAgo) {
              const month = formattedDate.format("MM/YYYY");
              if (countByDate[month]) {
                countByDate[month] += 1;
              } else {
                countByDate[month] = 1;
              }
            }
          });

          const lastMonthData = countByDate[lastMonthFormatted] || 0;
          const twoMonthsAgoData = countByDate[twoMonthsAgoFormatted] || 0;
          setLastMonthAmountVeterinarian(lastMonthData);
          setTwoMonthAmountVeterinarian(twoMonthsAgoData);
        }
      }, [veterinarianData.isSuccess]);
      useEffect(() => {
        if (petData.isSuccess) {
          const countByDate = {};
          const lastMonth = moment().subtract(1, 'month');
          const lastMonthFormatted = lastMonth.format("MM/YYYY");
          const twoMonthsAgo = moment().subtract(2, 'month');
          const twoMonthsAgoFormatted = twoMonthsAgo.format("MM/YYYY");;
          setTotalPet(petData.data.length)
          petData.data.forEach((item) => {
            const formattedDate = moment(item.date_create);
            const isLastMonth = formattedDate.isSame(lastMonth, 'month');
            const isTwoMonthsAgo = formattedDate.isSame(twoMonthsAgo, 'month');
      
            if (isLastMonth || isTwoMonthsAgo) {
              const month = formattedDate.format("MM/YYYY");
              if (countByDate[month]) {
                countByDate[month] += 1;
              } else {
                countByDate[month] = 1;
              }
            }
          });

          const lastMonthData = countByDate[lastMonthFormatted] || 0;
          const twoMonthsAgoData = countByDate[twoMonthsAgoFormatted] || 0;
          setLastMonthAmountPet(lastMonthData);
          setTwoMonthAmountPet(twoMonthsAgoData)
        }
      }, [petData.isSuccess]);
  return (
    <>
        {postData.isSuccess && userData.isSuccess&&
            <ResponsiveLine
            data={data}

            options={{
                scales: {
                  yAxes: [{
                    ticks: {
                      stepSize: 1
                    }
                  }]
                }
              }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: colors.grey[100],
                  },
                },
                legend: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
                ticks: {
                  line: {
                    stroke: colors.grey[100],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: colors.grey[100],
                  },
                },
              },
              legends: {
                text: {
                  fill: colors.grey[100],
                },
              },
              tooltip: {
                container: {
                  color: colors.primary[500],
                },
              },
            }}
            colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: 0,
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="cardinal"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 0,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? undefined : "transportation", // added
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5, // added
              tickSize: 3,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? undefined : "count", // added
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={8}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        }
    </>
    
  );
};

export default LineChart;
