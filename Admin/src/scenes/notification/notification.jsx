import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { makeRequest } from '../../axios';
import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";

function Notification(props) {
    const [value, setValue] = useState('');
    const [selectedListUser, setSelectedListUser] = useState([]);
    const theme = useTheme();
    const queryClient = useQueryClient();
    const colors = tokens(theme.palette.mode);

        const userData = useQuery({
            queryKey: ["users"],
            queryFn: () =>
            makeRequest.get("/user/getAll").then((res) => {
                return res.data;
              }),
          },
          );

          const columns = [
            // { field: "id", headerName: "ID",width: 110 },
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
          ];
          const userSubset = userData.isSuccess && userData.data.map(({idUser, name, avatar}, index) => ({ id: idUser, name, avatar}));
          const handleRowSelection = (params) => {
            setSelectedListUser(params);
          };

          const mutationAdd = useMutation(
            (noti) => {
                return makeRequest.post("/notification/add", noti);
            },
            {
                onSuccess: () => {
                    setSelectedListUser([]);
                    setValue('');
                    alert('Thông báo thành công')
                },
            },

        );

    const handleAddNoti = () =>{
        const values = {
            listUser: selectedListUser,
            content: value
        } 
        mutationAdd.mutate(values)
    }
    return (
        <div >
            <div className='grid grid-cols-5 gap-5'>
                <ReactQuill className='col-span-3' style={{backgroundColor: '#fff', height:'100%',  color: '#000'}} theme="snow" value={value} onChange={setValue} />
                <div className='col-span-2'>

                    <Box m="20px">
                        <Box
                            m="40px 0 0 0"
                            height="70vh"
                            sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none",
                                fontSize: '15px'
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
                            {userData.isSuccess &&
                                <DataGrid
                                onRowSelectionModelChange={handleRowSelection} 
                                checkboxSelection rows={userSubset} 
                                columns={columns} />
                            }
                        </Box>
                        </Box>
                </div>
            </div>
            <button onClick={handleAddNoti} className='mt-10 bg-blue p-4 w-full '>Add Notification</button>
        </div>
    );
}

export default Notification;