import React, { useMemo,useEffect } from 'react'
import { FormControl,MenuItem,InputLabel,Box,Select } from '@mui/material'
import Header from '../../components/Header'
import OverviewChart from '../../components/OverviewChart'
import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { GetSales } from '../../api/API'

function Monthly() {
    const [startDate,setStartDate]=useState(new Date("2022-02-01"))
    const [endDate,setEndDate]=useState(new Date("2022-03-01"))
    const [data1,SetData]=useState({})
    const theme=useTheme();
    const dispatch=useDispatch()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await dispatch(GetSales());
          console.log(response.payload['salesByCategory']);
          if (response && response.payload) {
            SetData(response.payload);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response);
          }
        }
      };
    
    
      fetchData();
    }, [dispatch]); 

      const [formattedData] = useMemo(() => {
        if (!data1) return [];
    
        const { monthlyData } = data1;
        const totalSalesLine = {
          id: "totalSales",
          color: theme.palette.secondary.main,
          data: [],
        };
        const totalUnitsLine = {
          id: "totalUnits",
          color: theme.palette.secondary[600],
          data: [],
        };
        if(monthlyData!=undefined)
         {
    
        Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
          totalSalesLine.data = [
            ...totalSalesLine.data,
            { x: month, y: totalSales },
          ];
          totalUnitsLine.data = [
            ...totalUnitsLine.data,
            { x: month, y: totalUnits },
          ];
        });
    }
    
    
        const formattedData = [totalSalesLine, totalUnitsLine];
        return [formattedData];
       
      }, [data1]); // eslint-disable-line react-hooks/exhaustive-deps
    
      return (
        <Box position={"relative"} left="300px" mt="40px"
height='75vh'
width='140vh'>
          <Header  left={300}    title="MONTHLY SALES" subtitle="Chart of monthlysales" />
          <Box height="75vh">
        
              <ResponsiveLine
                data={formattedData}
                theme={{
                  axis: {
                    domain: {
                      line: {
                        stroke: theme.palette.secondary[200],
                      },
                    },
                    legend: {
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                    ticks: {
                      line: {
                        stroke: theme.palette.secondary[200],
                        strokeWidth: 1,
                      },
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                  },
                  legends: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  tooltip: {
                    container: {
                      color: theme.palette.primary.main,
                    },
                  },
                }}
                colors={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=" >-.2f"
                // curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 90,
                  legend: "Month",
                  legendOffset: 60,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total",
                  legendOffset: -50,
                  legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
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
         
          </Box>
        </Box>
      );
    };


export default Monthly