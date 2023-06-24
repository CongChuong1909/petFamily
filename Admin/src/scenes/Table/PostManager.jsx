import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { useState } from "react";
import Report from "../form/Report";

const PostManager = () => {
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
  const userSubset = postData.isSuccess && postData.data.map(({idposts, avatar, name, textcontent,date_create, post_method, post_status}, index) => ({id:idposts, avatar, name, textcontent,date_create, post_method, post_status }));

//   postData.isSuccess && console.log(userSubset);
  const columns = [
    { field: "id", headerName: "ID",width: 100 },
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
        width: 100,
        cellClassName: "name-column--cell",
    },
   
    {
      field: "textcontent",
      headerName: "Text Content",
      headerAlign: "left",
      width: 300,
      align: "left",
    },
    {
      field: "date_create",
      headerName: "Date Create",
      width:100,
      renderCell: ({ row: { date_create } }) => {
        return (
         <>
            {moment(date_create).format("DD/MM/YYYY")}
         </>
        );
      },
    },
    {
      field: "post_method",
      headerName: "Method Post",
        width: 100,
        renderCell: ({ row: { post_method } }) => {
            return (
             <>
                {post_method === 1 ? <p>Private</p>: <p>Public</p>}
             </>
            );
          },
    },
    {
        field: "status",
        headerName: "Status",
        width:200,
        renderCell: ({ row: { post_status } }) => {
            return (
             <>
                {post_status === 1 ? 
                        <Button
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        sx={{ bgcolor: 'error.main', color: 'white',
                        ':hover': {
                            bgcolor: 'error.main',
                            color: 'white',
                          },
                    }}
                        
                        >
                        Warning Content And Delete
                    </Button>
                : post_status === 2 ?
                    <Button
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    sx={{ bgcolor: 'warning.main', color: 'white',
                        ':hover': {
                            bgcolor: 'warning.main',
                            color: 'white',
                        },
                    }}
                        
                        >
                        UnBlock
                    </Button>:
                    <p>Has been deleted</p>
                }

             </>
            );
          },
      },
    
  ];


  return (
    <Box m="20px">
      <Header title="POST" subtitle="Managing the post" />
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
        {postData.isSuccess && <DataGrid 
             initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10, 25]}
            checkboxSelection rows={userSubset} columns={columns} />
        }
      </Box>
      <Box m="20px" paddingBottom={10}>
        <Header title="REPORT" subtitle="Managing the post has been reported" />
        <Report/>
      </Box>
    </Box>
  );
};

export default PostManager;
