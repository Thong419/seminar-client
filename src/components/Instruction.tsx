import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Paper, Button, Link, Divider, Card, CardContent } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import { handleDownload } from '../api';

const Instruction: React.FC = () => {
  return (
    <Box sx={{ padding: 3, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Hướng Dẫn Cài Đặt Chứng Chỉ và Xác Thực
      </Typography>

      <Paper sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          1. Cài `ca.crt` vào máy tính (Dành cho người dùng bình thường)
        </Typography>
        <Typography variant="body1" paragraph>
          Để truy cập các trang web nội bộ của công ty mà không gặp lỗi bảo mật, bạn cần cài chứng chỉ gốc của CA nội bộ vào máy tính.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Bước 1:"
              secondary="Tải chứng chỉ ca.crt"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bước 2:"
              secondary={
                <>
                  Cài đặt chứng chỉ gốc vào Windows/macOS bằng cách:
                  <ul>
                    <li>Windows: Mở "Certmgr.msc" và import chứng chỉ vào thư mục "Trusted Root Certification Authorities".</li>
                    <li>macOS: Mở Keychain Access và import vào "System" Keychain.</li>
                  </ul>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bước 3:"
              secondary="Sau khi cài đặt xong, bạn có thể truy cập các trang web nội bộ của công ty mà không gặp lỗi."
            />
          </ListItem>
        </List>
        <Box mt={4}>
  <Card variant="outlined" sx={{ p: 2 }}>
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box display="flex" alignItems="center">
        <SecurityIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="body1">Tải xuống chứng chỉ CA (ca.crt)</Typography>
      </Box>
      <Button
        variant="outlined"
        // href="/public/ca/ca.crt"
        // download
        color="primary"
        onClick={() => handleDownload('/ca/ca.crt', 'ca.crt')}
      >
        Download
      </Button>
    </CardContent>
  </Card>
</Box>
      </Paper>

      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          2. Cấu hình Web App để gửi yêu cầu tới CA (Dành cho người dùng cấp cao, Web App)
        </Typography>
        <Typography variant="body1" paragraph>
          Để gửi yêu cầu tới CA và nhận chứng chỉ, web app cần sử dụng chứng chỉ cá nhân và chứng chỉ gốc của CA.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Bước 1:"
              secondary="Tải các chứng chỉ sau từ hệ thống: user.crt, user.key, ca.crt"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bước 2:"
              secondary="Web App cần cấu hình để sử dụng các chứng chỉ này khi gửi yêu cầu tới CA:"
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bước 3:"
              secondary={
                <>
                  Cấu hình client trong code:
                  <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
                    {`const httpsAgent = new https.Agent({
                    cert: fs.readFileSync('path/to/certificate.crt'),
                    key: fs.readFileSync('path/to/private.key'),
                    ca: fs.readFileSync('path/to/ca.crt'),
                    rejectUnauthorized: true,
                    });`}
                  </pre>
                </>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Bước 4:"
              secondary="Sau khi cấu hình xong, web app sẽ có thể gửi yêu cầu xác thực và nhận chứng chỉ từ CA nội bộ."
            />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default Instruction;
