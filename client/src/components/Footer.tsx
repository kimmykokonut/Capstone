import { Box } from "@mui/material";

const Footer = () => {
  // update link if project name changes
  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'right', padding: '5px' }}>
      built with mush love by <a href="https://github.com/kimmykokonut/Capstone" style={{ textDecoration: 'none', color: 'green' }}>kimmykokonut</a>
    </Box>
  )
}
export default Footer;