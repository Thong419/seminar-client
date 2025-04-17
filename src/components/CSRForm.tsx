import {
  Box,
  Button,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';

import { useForm, FormProvider } from 'react-hook-form';
import { CSRFormData, getAllCSRs, handleDownload } from '../api';
import { generateCSR } from '../api';
import JSZip from 'jszip';
import { useEffect, useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


type CSRType = {
  _id: string;
  commonName: string;
  organization: string;
  country: string;
  organizationalUnit?: string;
  state?: string;
  locality?: string;
  email?: string;
  csrUrl?: string;
  certUrl?: string;
  privateKeyUrl?: string;
  createdAt: string;
};


export default function CSRForm() {
  const methods = useForm<CSRFormData>({
    defaultValues: {
      commonName: '',
      organization: '',
      country: '',
      organizationalUnit: '',
      state: '',
      locality: '',
      email: '',
    }
  });

  const { register, handleSubmit, formState: { errors } } = methods;
  const [downloadFiles, setDownloadFiles] = useState<{ name: string; url: string }[]>([]);
  const [rows, setRows] = useState<CSRType[]>([]);
  const [loading, setLoading] = useState(true);

  const onSubmit = async (data: CSRFormData) => {
    console.log('Submitting:', data);
    try {
      const response = await generateCSR(data); // response.data = { message, downloadLinks }
  
      const urls = response.data.downloadLinks;
  
      const fileList = [
        { name: 'private.key', url: urls.privateKeyUrl },
        { name: 'certificate.crt', url: urls.certUrl },
        // { name: 'request.csr', url: urls.csrUrl }
      ];
  
      setDownloadFiles(fileList);


      // setRows((prevRows) => [...prevRows, response.data.newCSR]);
      // Add the new CSR to the rows state as first element
      setRows((prevRows) => [response.data.newCSR, ...prevRows]);

    } catch (err) {
      console.error('Lỗi gửi form:', err);
    }
  };
  
  useEffect(() => {
    const fetchCSRs = async () => {
      try {
        const response = await getAllCSRs();
        setRows(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách CSR:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCSRs();
  }, []);
  
    const columns: GridColDef[] = [
      { field: 'commonName', headerName: 'Common Name', width: 150 },
      { field: 'organization', headerName: 'Organization', width: 150 },
      { field: 'country', headerName: 'Country', width: 100 },
      { field: 'organizationalUnit', headerName: 'Org Unit', width: 100 },
      { field: 'state', headerName: 'State', width: 130 },
      { field: 'locality', headerName: 'Locality', width: 130 },
      { field: 'email', headerName: 'Email', width: 130 },
      // {
      //   field: 'csrUrl',
      //   headerName: 'CSR File',
      //   width: 130,
      //   renderCell: (params) =>
      //     params.value ? (
      //       <Link href={params.value} target="_blank" rel="noopener">
      //         Download
      //       </Link>
      //     ) : (
      //       '-'
      //     ),
      // },
      {
        field: 'certUrl',
        headerName: 'Cert File',
        width: 130,
        renderCell: (params) =>
          params.value ? (
<IconButton edge="end" onClick={() => handleDownload(params.value, "certificate.crt")}>
<DownloadIcon />
</IconButton>
          ) : (
            '-'
          ),
      },
      {
        field: 'privateKeyUrl',
        headerName: 'Key File',
        width: 130,
        renderCell: (params) =>
          params.value ? (
<IconButton edge="end" onClick={() => handleDownload(params.value, "private.key")}>
<DownloadIcon />
</IconButton>
          ) : (
            '-'
          ),
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        width: 300,
      },
    ];
  
  

  return (
    <Box>
  
    <FormProvider {...methods}>
      <Box mt={2} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Nhập thông tin web server
        </Typography>

        <Grid container spacing={2}>
          <Grid >
            <TextField
              label="Common Name (CN)*"
              fullWidth
              {...register("commonName", {
                required: "Bắt buộc",
                minLength: { value: 3, message: "Tối thiểu 3 ký tự" }
              })}
              error={!!errors.commonName}
              helperText={errors.commonName?.message}
            />
          </Grid>

          <Grid >
            <TextField
              label="Tổ chức (O)*"
              fullWidth
              {...register("organization", { required: "Bắt buộc" })}
              error={!!errors.organization}
              helperText={errors.organization?.message}
            />
          </Grid>
          <Grid >
            <TextField
              label="Quốc gia (C)*"
              fullWidth
              {...register("country", {
                required: "Bắt buộc",
                minLength: { value: 2, message: "Phải gồm 2 chữ cái" },
                maxLength: { value: 2, message: "Phải gồm 2 chữ cái" }
              })}
              error={!!errors.country}
              helperText={errors.country?.message}
            />
          </Grid>
          <Grid  >
            <TextField
              label="Đơn vị (OU)"
              fullWidth
              {...register("organizationalUnit")}
            />
          </Grid>

          <Grid >
            <TextField
              label="Tỉnh/Thành phố (ST)"
              fullWidth
              {...register("state")}
            />
          </Grid>

          <Grid>
            <TextField
              label="Khu vực (L)"
              fullWidth
              {...register("locality")}
            />
          </Grid>



          <Grid>
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ"
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
        </Grid>

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Gửi yêu cầu CSR
          </Button>
        </Box>

        <Box mt={2}>
  {downloadFiles.length > 0 && (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" gutterBottom>
          📂 Các file đã tạo:
        </Typography>
        <List dense>
          {downloadFiles.map((file) => (
            <ListItem
              key={file.name}
              secondaryAction={
              <IconButton edge="end" onClick={() => handleDownload(file.url, file.name)}>
                <DownloadIcon />
              </IconButton>
              }
            >
              <ListItemIcon>
                <InsertDriveFileIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )}
</Box>
      </Box>
    </FormProvider>
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
      />
    </Box>
    </Box>

  );
}
