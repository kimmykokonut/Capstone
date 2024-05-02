import { Typography, Grid, Card, CardContent, CardActions, CardHeader, Button, Dialog, DialogContent, DialogTitle, List, ListItem, ListItemIcon } from "@mui/material";
import { Masonry } from '@mui/lab';
import { Link } from "react-router-dom";
import { useState } from "react";
import ParkIcon from '@mui/icons-material/Park';
import NatureIcon from '@mui/icons-material/Nature';
import HikingIcon from '@mui/icons-material/Hiking';
import GrassIcon from '@mui/icons-material/Grass';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CabinIcon from '@mui/icons-material/Cabin';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Resources = () => {
  const [openCamp, setOpenCamp] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openFederal, setOpenFederal] = useState(false);

  const handleOpenCamp = () => {
    setOpenCamp(true);
  };
  const handleCloseCamp = () => {
    setOpenCamp(false);
  };
  const handleOpenState = () => {
    setOpenState(true);
  };
  const handleCloseState = () => {
    setOpenState(false);
  };
  const handleOpenFederal = () => {
    setOpenFederal(true);
  };
  const handleCloseFederal = () => {
    setOpenFederal(false);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3" align="center" mt={2}>Resources</Typography>
      </Grid>
      <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#d4d0c7' }}>
            <CardHeader title={<Typography variant="h5">Pack it!</Typography>} avatar={<CheckCircleOutlineIcon />} />
            <CardActions>
              <Link to="/resources/checklist">Foraging checklist</Link>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title={<Typography variant="h5">Fires?</Typography>} avatar={<LocalFireDepartmentIcon />} />
            <CardActions>
              <Button component="a" href="https://usfs.maps.arcgis.com/apps/webappviewer/index.html?id=8e69381e35144962a835ee59aafba153&extent=-13824681.7736%2C5524992.5059%2C-13254461.5425%2C5790687.6163%2C102100">USFS Map</Button></CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#d4d0c7' }}>
            <CardHeader title="Foraging Permits" />            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon><HikingIcon /></ListItemIcon>
                  <Button component="a" href="https://www.fs.usda.gov/detail/mthood/passes-permits/forestproducts/?cid=stelprd3793091">
                    Mt Hood National Forest                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><GrassIcon /></ListItemIcon>
                  <Button component="a" href="https://gp.fs2c.usda.gov/gp/">
                    Gifford Pinchot National Forest                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><HikingIcon /></ListItemIcon>
                  <Button component="a" href="https://myodfw.com/sauvie-island-wildlife-area-visitors-guide">Sauvie Island</Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Mushroom Harvest Maps" />
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon><NatureIcon /></ListItemIcon>
                  <Button component="a" href="https://store.avenza.com/products/gifford-pinchot-nf-special-forest-products-map-us-forest-service-r6-pacific-northwest-region-waor-map">
                    Gifford Pinchot
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><ParkIcon /></ListItemIcon>
                  <Button component="a" href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395147.pdf" color="primary">
                    Barlow & Hood River Ranger District
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><NatureIcon /></ListItemIcon>
                  <Button component="a" href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395148.pdf">
                    Clackamas River Ranger District
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><ParkIcon /></ListItemIcon>
                  <Button component="a" href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395150.pdf">
                    Zigzag Ranger District
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ bgcolor: '#d4d0c7' }}>
            <CardHeader title="Parking Passes" />
            <CardContent>
              <Typography variant="subtitle1">Federal</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <Button component="a" href="https://www.fs.usda.gov/detail/r6/passes-permits/recreation/?cid=fsbdev2_027010">
                    Forest Service: NW Forest Parking Pass
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <Button component="a" href="https://www.nps.gov/planyourvisit/passes.htm">
                    America the Beautiful
                  </Button>
                </ListItem>
              </List>
              <Typography variant="subtitle1">State</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <Button component="a" href="https://www.discoverpass.wa.gov/143/Washington-Recreation-Lands?gclid=CjwKCAjwndCKBhAkEiwAgSDKQSQa468hTsmRuFIsqZpaBBEQKtL1P5cow4odOns6N-nKOzvLOklGhxoCRbcQAvD_BwE">
                    Washington Discover Pass
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <Button component="a" href="https://store.oregonstateparks.org/">
                    Oregon State Parks
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
                  <Button component="a" href="https://odfw.huntfishoregon.com/login">
                    Oregon Fish & Wildlife: Sauvie Island
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title={<Typography variant="h5">Regulations: Portland</Typography>} avatar={<EditNoteIcon />} />
            <CardContent>
              <Typography variant="subtitle1">Portland City Parks/Metro: Foraging not allowed.</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={handleOpenState} sx={{ bgcolor: '#d4d0c7' }}>
            <CardHeader title={<Typography variant="h5">State Regulations</Typography>} avatar={<EditNoteIcon />} />
            <CardContent sx={{ height: '300px', overflow: 'auto', textOverflow: 'ellipsis' }}>
              <List>
                <ListItem>
                  <Typography variant="body1"><strong>Oregon State Forest Lands:</strong> If collecting for personal use, no permit for collecting from state forestland in the Astoria, Tillamook, Forest Grove, North Cascade, or West Oregon Districts.  The limit for personal use is one gallon per vehicle at any one time. No parking permit needed.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Oregon State Parks and Recreation Areas:</strong> Oregon state law 736-010-0055 states, “Unless otherwise posted a person may gather for personal consumption of berries, fruits, mushrooms, or similar edibles in quantities not to exceed five gallons per person per day.”  OR State parking pass needed.</Typography>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Typography variant="body1"><strong>Washington State Park:</strong> No permit needed. 2 gallons per person per day. WA Discover parking pass needed.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Washington DNR and wildlife areas:</strong> No permit needed. 5 gallons per person.</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Dialog open={openState} onClose={handleCloseState} fullWidth maxWidth="md">
            <DialogTitle>State Regulations</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <Typography variant="body1"><strong>Oregon State Forest Lands:</strong> If collecting for personal use, no permit for collecting from state forestland in the Astoria, Tillamook, Forest Grove, North Cascade, or West Oregon Districts.  The limit for personal use is one gallon per vehicle at any one time. No parking permit needed.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Oregon State Parks and Recreation Areas:</strong> Oregon state law 736-010-0055 states, “Unless otherwise posted a person may gather for personal consumption of berries, fruits, mushrooms, or similar edibles in quantities not to exceed five gallons per person per day.”  OR State parking pass needed.</Typography>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <Typography variant="body1"><strong>Washington State Park:</strong> No permit needed. 2 gallons per person per day. WA Discover parking pass needed.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Washington DNR and wildlife areas:</strong> No permit needed. 5 gallons per person.</Typography>
                </ListItem>
              </List>
            </DialogContent>
          </Dialog>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={handleOpenFederal} sx={{ bgcolor: '#d4d0c7' }}>
            <CardHeader title={<Typography variant="h5">Federal Regulations</Typography>} avatar={<EditNoteIcon />} />
            <CardContent sx={{ height: '300px', overflow: 'auto', textOverflow: 'ellipsis' }}>
              <List>
                <ListItem>
                  <Typography variant="body1" ><strong>Bureau of Land Management (BLM):</strong> There are no requirements for a permit to collect mushrooms for personal use on lands managed by the BLM.  Up to 1 gallon of mushrooms per person per day.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>National Parks and National Monuments:</strong> No foraging allowed. <strong>Wilderness Areas:</strong> You may collect and consume mushroom within Wilderness areas.  You may not remove mushrooms from Wilderness areas. Includes Columbia river gorge scenic area.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>National Forest Lands:</strong> It is prohibited to collect forest products in wilderness areas, Old Maid Flats, developed recreation sites, or other areas normally closed to harvest. Personal use mushroom harvest is limited to 1 gallon per day and a total of 10 gallons per year. Entering fire closure areas to collect mushrooms or other forest products is prohibited.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Siuslaw National Forest (Central Oregon Coast):</strong>  No permit or fee for quantities less than one gallon per person per day. Up to six matsutake mushrooms per day for incidental/non-commercial use. To remove their commercial value, cut all matsutake mushrooms in half length-wise.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Ochoco National Forest:</strong>  A free use <a href="https://www.fs.usda.gov/detail/ochoco/news-events/?cid=FSEPRD579783">permit</a> allows you to gather up to two gallons per person per day. You may obtain a personal use permit at a US Forest Service Office or Ranger Station.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Willamette National Forest, Deschutes, Fremont-Winema, and Umpqua National Forest:</strong>  A free use permit that is valid for any of these four forests. The Willamette National Forest is no longer requiring a permit for collecting up to 1 gallon of mushrooms (other than Matsutake), per day, for personal use/consumption.  <strong>Everyone</strong> (including personal use) must have a <a href="https://www.fs.usda.gov/detail/deschutes/home/?cid=fseprd950012">Matsutake permit</a>.  All Willamette National Forest Offices and ranger stations are still issuing personal use mushroom permits for those who wish to collect up to 2 gallons per day, and as a convenience for those visiting the forests that do require a permit.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Malheur, Umatilla, and Wallowa-Whitman National Forests:</strong>  A permit is not required to collect less than one gallon in Oregon or less than five gallons.</Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Dialog open={openFederal} onClose={handleCloseFederal} fullWidth maxWidth="md">
            <DialogTitle>Federal Regulations</DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <Typography variant="body1"><strong>Bureau of Land Management (BLM):</strong> There are no requirements for a permit to collect mushrooms for personal use on lands managed by the BLM.  Up to 1 gallon of mushrooms per person per day.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>National Parks and National Monuments:</strong> No foraging allowed. <strong>Wilderness Areas:</strong> You may collect and consume mushroom within Wilderness areas.  You may not remove mushrooms from Wilderness areas. Includes Columbia river gorge scenic area.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>National Forest Lands:</strong> It is prohibited to collect forest products in wilderness areas, Old Maid Flats, developed recreation sites, or other areas normally closed to harvest. Personal use mushroom harvest is limited to 1 gallon per day and a total of 10 gallons per year. Entering fire closure areas to collect mushrooms or other forest products is prohibited.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Siuslaw National Forest (Central Oregon Coast):</strong>  No permit or fee for quantities less than one gallon per person per day. Up to six matsutake mushrooms per day for incidental/non-commercial use. To remove their commercial value, cut all matsutake mushrooms in half length-wise.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Ochoco National Forest:</strong>  A free use <a href="https://www.fs.usda.gov/detail/ochoco/news-events/?cid=FSEPRD579783">permit</a> allows you to gather up to two gallons per person per day. You may obtain a personal use permit at a US Forest Service Office or Ranger Station.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Willamette National Forest, Deschutes, Fremont-Winema, and Umpqua National Forest:</strong>  A free use permit that is valid for any of these four forests. The Willamette National Forest is no longer requiring a permit for collecting up to 1 gallon of mushrooms (other than Matsutake), per day, for personal use/consumption.  <strong>Everyone</strong> (including personal use) must have a <a href="https://www.fs.usda.gov/detail/deschutes/home/?cid=fseprd950012">Matsutake permit</a>.  All Willamette National Forest Offices and ranger stations are still issuing personal use mushroom permits for those who wish to collect up to 2 gallons per day, and as a convenience for those visiting the forests that do require a permit.</Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="body1"><strong>Malheur, Umatilla, and Wallowa-Whitman National Forests:</strong>  A permit is not required to collect less than one gallon in Oregon or less than five gallons.</Typography>
                </ListItem>
              </List>
            </DialogContent>
          </Dialog>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card onClick={handleOpenCamp} >
            <CardHeader title={<Typography variant="h5">Campgrounds</Typography>} avatar={<CabinIcon />} />
            <CardContent>
              <Typography variant="body1" sx={{ display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>Rules for a campground may differ from the general rules for the park or forest lands in which the campground resides.  Always check to see if there are any signs about picking mushrooms and/or forest products.  If there are no signs, follow the rules for the park or forest land the campground is located within. Fortunately, many campgrounds close down sections in the fall, or in some cases an entire campground closes.  Picking in a closed area or campground is best.  If you do go into an occupied area do not disturb the campers.</Typography>
            </CardContent>
          </Card>
          <Dialog open={openCamp} onClose={handleCloseCamp} fullWidth maxWidth="md">
            <DialogTitle>Campground Info</DialogTitle>
            <DialogContent>
              <Typography variant="body1">Rules for a campground may differ from the general rules for the park or forest lands in which the campground resides.  Always check to see if there are any signs about picking mushrooms and/or forest products.  If there are no signs, follow the rules for the park or forest land the campground is located within. Fortunately, many campgrounds close down sections in the fall, or in some cases an entire campground closes.  Picking in a closed area or campground is best.  If you do go into an occupied area do not disturb the campers.</Typography>
            </DialogContent>
          </Dialog>
        </Grid>
      </Masonry >
    </>
  )
}
export default Resources;