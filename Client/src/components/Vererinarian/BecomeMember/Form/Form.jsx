import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InfoVerterinarian from "./InfoVerterinarian";
import Certificate from "./Certificate";
import Services from "./Services";
import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "~/axios";

const steps = ["Thông tin bác sĩ/ phòng khám", "Chứng chỉ thú y"];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Form() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [office, setOffice] = useState("");
    const [image, setImage] = useState(null);
    const [checkConfirm, setCheckConfirm] = useState(false);
    const [info, setInfo] = useState({
        firstName:'',
        lastName:'',
        phoneNumber1:'',
        phoneNumber2:'',
    })
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const mutation = useMutation(
        (newFormRegiter)=>{
        return makeRequest.post("veterinarian/register", newFormRegiter)
        })
    
    const handleNext = () => {
        console.log(activeStep);
        if(activeStep === 0 )
        {
            if(info.firstName === '' || info.lastName === '' || info.phoneNumber1 === '' || address1 === '/')
                alert("vui lòng điền đầy đủ thông tin!")
            else setActiveStep(activeStep + 1);
        }
        else if(activeStep === 1)
        {
            if(image === null || office === '')
                alert("vui lòng điền đầy đủ thông tin");
            if(checkConfirm === false)
                alert('Nhấn "Tôi đảm bảo rằng mọi thông tin đều chính xác" để tiếp tục')
            else{
                const values = {
                    name: info.firstName+ info.lastName,
                    phone: info.phoneNumber1,
                    phone2: info.phoneNumber2,
                    address: address1,
                    address2: address2,
                    certificateImage: image,
                    office: office
                 }
                mutation.mutate(values);
                setActiveStep(activeStep + 1);
            }
        }
    };


    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />

            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography component="h1" variant="h4" align="center">
                        Tham gia với chúng tôi
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1">
                                Your order number is #2001539. We have emailed
                                your order confirmation, and will send you an
                                update when your order has shipped.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep === 0 ? (
                                <InfoVerterinarian setAddress1 = {setAddress1} setAddress2 = {setAddress2} setInfo = {setInfo} info = {info} />
                            ) : activeStep === 1 ? (
                                <Certificate
                                    setOffice={setOffice}
                                    office={office}
                                    setCheckConfirm={setCheckConfirm}
                                    checkConfirm={checkConfirm}
                                    setImage={setImage}
                                    image={image}
                                />
                            ) : (
                                <></>
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                {activeStep !== 0 && (
                                    <Button
                                        onClick={handleBack}
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Quay lại
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1
                                        ? "Đăng ký"
                                        : "Tiếp tục"}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
