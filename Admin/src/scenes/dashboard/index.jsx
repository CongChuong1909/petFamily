import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { useState } from "react";
import moment from 'moment'

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalPost, setTotalPost] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalVeterinarian, setTotalVeterinarian] = useState(0);
  const [totalPet, setTotalPet] = useState(0);
  const [lastMonthData, setLastMonthData] = useState(0);
  const [twoMonthsAgoData, setTwoMonthsAgoData] = useState(0);  

  const [lastMonthAmountUser, setLastMonthAmountUser] = useState(0);
  const [twoMonthAmountUser, setTwoMonthAmountUser] = useState(0);

  const [lastMonthAmountVeterinarian, setLastMonthAmountVeterinarian] = useState(0);
  const [twoMonthAmountVeterinarian, setTwoMonthAmountVeterinarian] = useState(0);

  const [lastMonthAmountPet, setLastMonthAmountPet] = useState(0);
  const [twoMonthAmountPet, setTwoMonthAmountPet] = useState(0);
  const lastMonth = moment().subtract(1, 'month');
  const lastMonthFormatted = lastMonth.format("MM/YYYY");
  const twoMonthsAgo = moment().subtract(2, 'month');
  const twoMonthsAgoFormatted = twoMonthsAgo.format("MM/YYYY");

  const decreasePercentagePost  = ((lastMonthData - twoMonthsAgoData) / twoMonthsAgoData) * 100;
  let signPost = "+";
  let colorPost = colors.greenAccent[600];
  if (decreasePercentagePost < 0) {
    signPost = "-";
    colorPost = '#660000';
  }

  const decreasePercentageUser  = ((lastMonthAmountUser - twoMonthAmountUser) / twoMonthAmountUser) * 100;
  let signUser = "+";
  let colorUser = colors.greenAccent[600];
  if (decreasePercentageUser < 0) {
    signUser = "-";
    colorUser = '#660000';
  }
  const decreasePercentageVeterinarian  = ((lastMonthAmountVeterinarian - twoMonthAmountVeterinarian) / twoMonthAmountVeterinarian) * 100;
  let signVeterinarian = "+";
  let colorVeterinarian = colors.greenAccent[600];
  if (decreasePercentageVeterinarian < 0) {
    signVeterinarian = "-";
    colorVeterinarian = '#660000';
  }

  const decreasePercentagePet  = ((lastMonthAmountPet - twoMonthAmountPet) / twoMonthAmountPet) * 100;
  let signPet = "+";
  let colorPet = colors.greenAccent[600];
  if (decreasePercentagePet < 0) {
    signPet = "-";
    colorPet = '#660000';
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <p>data collected from {twoMonthsAgoFormatted} to {lastMonthFormatted} </p>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPost}
            subtitle="Total Post"
            progress={decreasePercentagePost/100}
            increase={
                <span style={{ colorPost }}>
                  {signPost}
                  {Math.abs(decreasePercentagePost).toFixed(2)}%
                </span>
              }
            icon={
              <PostAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalUser}
            subtitle="Total User"
            progress={decreasePercentageUser/100}
            increase={
                <span style={{ colorUser }}>
                  {signUser}
                  {Math.abs(decreasePercentageUser).toFixed(2)}%
                </span>
              }
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalVeterinarian}
            subtitle="Total Veterinarian"
            progress={decreasePercentageVeterinarian/100}
            increase={
                <span style={{ colorVeterinarian }}>
                  {signVeterinarian}
                  {Math.abs(decreasePercentageVeterinarian).toFixed(2)}%
                </span>
              }
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={totalPet}
            subtitle="Total Pet"
            progress={decreasePercentagePet/100}
            increase={
                <span style={{ colorPet }}>
                  {signPet}
                  {Math.abs(decreasePercentagePet).toFixed(2)}%
                </span>
              }
            icon={
              <AccountCircleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
        
          <Box height="500px" m="-20px 0 0 0">
            <LineChart 
                setTotalVeterinarian = { setTotalVeterinarian}
                setTotalPet = { setTotalPet}
                setTotalPost= {setTotalPost} isDashboard={true} 
                setLastMonthData = {setLastMonthData}
                setTotalUser = {setTotalUser}
                setTwoMonthsAgoData = {setTwoMonthsAgoData}
                setLastMonthAmountUser = {setLastMonthAmountUser}
                setTwoMonthAmountUser = {setTwoMonthAmountUser}
                setLastMonthAmountVeterinarian= {setLastMonthAmountVeterinarian}
                setTwoMonthAmountVeterinarian= {setTwoMonthAmountVeterinarian}
                setLastMonthAmountPet= {setLastMonthAmountPet}
                setTwoMonthAmountPet= {setTwoMonthAmountPet}
                />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

      </Box>
    </Box>
  );
};

export default Dashboard;
