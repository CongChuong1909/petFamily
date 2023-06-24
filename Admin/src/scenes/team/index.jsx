import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const queryClient = useQueryClient();
  const userData = useQuery({
    queryKey: ["users"],
    queryFn: () =>
    makeRequest.get("/user/getAll").then((res) => {
        return res.data;
      }),
  },
  );
  const columns = [
    { field: "id", headerName: "ID",width: 50 },
    {
        field: "avatar",
        headerName: "Avatar",
        width:50,
        renderCell: ({ row: { avatar } }) => {
          return (
            <div>
                <Avatar alt="Remy Sharp" src={avatar} />
            </div>
          );
        },
    },
    {
        field: "name",
        headerName: "Name",
        width: 150,
        cellClassName: "name-column--cell",
    },
   
    {
      field: "email",
      headerName: "Email",
      headerAlign: "left",
      width: 200,
      align: "left",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width:100,
      renderCell: ({ row: { phoneNumber } }) => {
        return (
         <>
            {phoneNumber === null? <p>not update</p>: phoneNumber}
         </>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
        width: 250,
        renderCell: ({ row: { address } }) => {
            return (
             <>
                {address === null || address === ''? <p>not update</p>: address}
             </>
            );
          },
    },
    {
        field: "status",
        headerName: "Status",
        width:80,
        renderCell: ({ row: { status, id } }) => {
            return (
             <>
                {status === 1 ? 
                        <Button
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        onClick={()=> handleBlock(id)}
                        sx={{ bgcolor: 'error.main', color: 'white',
                        ':hover': {
                            bgcolor: 'error.main', // theme.palette.primary.main
                            color: 'white',
                          },
                    }}
                        
                        >
                        Block
                    </Button>
                : 
                    <Button
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        onClick={()=> handleUnBlock(id)}
                        sx={{ bgcolor: '#e3a008', color: 'white',
                        ':hover': {
                            bgcolor: '#dda11a', 
                            color: 'white',
                        },
                    }}
                        
                        >
                        UnBlock
                    </Button>
                }
             </>
            );
          },
      },
    {
      field: "role",
      headerName: "Access Level",
      width: 250,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === 0
                ? colors.greenAccent[600]
                : role === 1
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === 0 && <AdminPanelSettingsOutlinedIcon />}
            {role === 1 && <SecurityOutlinedIcon />}
            {role === 2 && <LocalHospitalIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role=== 0? "Admin": role === 1? 'User': 'Veterinarian'}
            </Typography>
          </Box>
        );
      },
    },
  ];
  const mutationUpdateBlock = useMutation(
    (idUser) => {
        return makeRequest.put("/user/updateBlock", idUser);
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
        },
    },
);
const handleBlock = (id) =>{
    const value = {
        status: 0,
        id,
    }
    mutationUpdateBlock.mutate(value)
}
const handleUnBlock = (id) =>{
        const value = {
            status: 1,
            id,
        }
        mutationUpdateBlock.mutate(value)``
}
const userSubset = userData.isSuccess && userData.data.map(({idUser, email, name, avatar, phoneNumber, address, role, status }, index) => ({ id: idUser, email, name, avatar,  phoneNumber, address, role, status }));



  return (
    <Box m="20px">
      <Header title="USER" subtitle="Managing the User Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {userData.isSuccess && <DataGrid checkboxSelection rows={userSubset} columns={columns} />}
      </Box>
    </Box>
  );
};

export default Team;
