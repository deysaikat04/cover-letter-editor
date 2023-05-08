import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Typography from "@mui/material/Typography";
import { Textarea } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Home({ formData, setFormData }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [autoFillPassword, setAutoFillPassword] = useState("");
  const [verifySuccess, setVerifySuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    let contentFirst = formData.position
      ? formData.mainContent.replaceAll("<position_name>", formData.position)
      : formData.mainContent;
    let contentSecond = formData.companyName
      ? contentFirst.replaceAll("<company_name>", formData.companyName)
      : contentFirst;
    setFormData({
      ...formData,
      mainContent: contentSecond,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.position, formData.companyName]);

  useEffect(() => {
    if (verifySuccess) {
      setFormData({
        senderDetails: process.env.REACT_APP_SD_DETAILS,
        mainContent: process.env.REACT_APP_MAIN_CONTENT,
        endNote: process.env.REACT_APP_END_NOTE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [verifySuccess]);

  const verifyPassword = () => {
    const bytes = CryptoJS.AES.decrypt(
      process.env.REACT_APP_AUTOFILL_PASS_ENCRYPTED,
      process.env.REACT_APP_AUTOFILL_SECRET
    );
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    setVerifySuccess(data === autoFillPassword);
    setOpen(false);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <EditNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Let's add the basic details
          </Typography>
        </Box>
        <Box
          sx={{
            mx: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Button onClick={() => setOpen(true)}>Autofill</Button>
              </Grid>
            </Grid>
            <FormControl>
              <FormLabel>Date* </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                name="date"
                type="text"
                id="date"
                autoComplete="date"
                value={formData.date}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Your details* </FormLabel>
              <Textarea
                minRows={2}
                maxRows={4}
                name={"senderDetails"}
                value={formData.senderDetails}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Salutation* </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                id="salutation"
                type="text"
                name={"salutation"}
                value={formData.salutation}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Company name* </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="companyName"
                name={"companyName"}
                value={formData.companyName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Position* </FormLabel>
              <TextField
                margin="normal"
                required
                fullWidth
                type="text"
                id="position"
                name={"position"}
                value={formData.position}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Letter content* </FormLabel>
              <Textarea
                minRows={10}
                maxRows={40}
                type="text"
                id="mainContent"
                name={"mainContent"}
                value={formData.mainContent}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate("/view")}
            >
              Open modal
            </Button>

            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>

      <Grid
        item
        xs={false}
        sm={4}
        md={5}
        sx={{
          my: 8,
          mx: 2,
        }}
      >
        <p>{formData.date}</p>
        <p style={{ whiteSpace: "pre-line" }}>{formData.senderDetails}</p>
        <p>{formData.salutation}</p>
        <p style={{ whiteSpace: "pre-line" }}>{formData.mainContent}</p>
        <p style={{ whiteSpace: "pre-line" }}>{formData.endNote}</p>
      </Grid>

      <Modal
        open={open}
        setOpen={setOpen}
        autoFillPassword={autoFillPassword}
        setAutoFillPassword={setAutoFillPassword}
        verifyPassword={verifyPassword}
      />
    </Grid>
  );
}
