import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { taskValidationSchema } from "../validations/validationSchema";
import EventNoteIcon from "@mui/icons-material/EventNote";
import API_URLS from "../config/apiUrls";
import { toast } from "react-toastify";
import API from "../axiosInstance";

const defaultTheme = createTheme();

const TasksPage = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      dueDate: "",
    },
    validationSchema: taskValidationSchema,
    validateOnMount: true,
    onSubmit: async (values,{ resetForm }) => {
      // Handle form submission
      try {
        await API.post(`${API_URLS.TASKS}`, values);
        toast.success("Task Added.");
        resetForm();
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong. Please Try Again."
        );
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EventNoteIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create New Task
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Task Title"
                  name="title"
                  autoComplete="title"
                  autoFocus
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  label="Task Description"
                  name="description"
                  autoComplete="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="dueDate"
                  label="Due Date"
                  type="date"
                  name="dueDate"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dueDate && Boolean(formik.errors.dueDate)
                  }
                  helperText={formik.touched.dueDate && formik.errors.dueDate}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "secondary.main",
                "&:hover": {
                  bgcolor: "secondary.main",
                },
              }}
            >
              Create Task
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default TasksPage;
