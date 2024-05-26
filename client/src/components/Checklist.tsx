import { Container, Button, Checkbox, Typography } from "@mui/material";

const Checklist = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Button onClick={handlePrint} variant="outlined" color="success">Print Me</Button>
      <h2>Mushroom Hunting Checklist</h2>
      <Typography variant="subtitle2">Mushroom hunting is generally a fun day trip!  But we all know that it is not all that difficult to get turned around and lost.</Typography>
      <Typography variant="subtitle2">PLEASE be prepared with the following items, and ask yourself: Could I survive a night in the woods with the gear that I am carrying?</Typography>
      <h3>Essential Items</h3>
      <Typography><Checkbox /><strong>Whistle</strong></Typography>
      <Typography><Checkbox /><strong>Watch</strong></Typography>
      <Typography><Checkbox /><strong>Permits</strong>: Foraging and/or Parking Permits as required</Typography>
      <Typography><Checkbox /><strong>Water</strong>(pack extra)</Typography>
      <Typography><Checkbox />High energy snacks (trail mix, dried fruit, power bars, etc)</Typography>
      <Typography><Checkbox />Sun protection (hat, sunblock)</Typography>
      <Typography><Checkbox />Navigation: Good topographic map of the area that is accessible offline (Gaia GPS App)</Typography>
      <Typography><Checkbox />Compass</Typography>
      <Typography><Checkbox />Flashlight or headlamp with extra batteries</Typography>
      <Typography><Checkbox />Extra clothing </Typography>
      <Typography><Checkbox />First aid kit</Typography>
      <Typography><Checkbox />Space blanket or 2 large heavy duty trash bags</Typography>
      <Typography><Checkbox />Mirror or signaling device</Typography>
      <Typography><Checkbox />Waterproof matches or lighter</Typography>
      <Typography><Checkbox />Fire starter or candle</Typography>
      <Typography><Checkbox />Notepaper and pencil</Typography>
      <h3>Clothes: <em>either on your body or in  your backpack</em></h3>
      <Typography><Checkbox />Synthetic (polyester, nylon, fleece, wool, or silk) layers. Please, <strong>NO cotton or jeans</strong></Typography>
      <Typography><Checkbox />Rain jacket with hood</Typography>
      <Typography><Checkbox />Rain pants</Typography>
      <Typography><Checkbox />Sturdy, moisture-proof boots (no street shoes, tennis shoes or sandals)</Typography>
      <Typography><Checkbox />Hat(s) <em>for warmth/shade/rain</em></Typography>
      <Typography><Checkbox />Mittens or gloves </Typography>
      <Typography><Checkbox />Brightly colored - Highly visible - Reflective vest or jacket</Typography>
      <h3>In your flat-bottomed basket:</h3>
      <Typography><Checkbox />Knife, brightly marked</Typography>
      <Typography><Checkbox />Brush for cleaning mushrooms prior to putting them in your basket</Typography>
      <Typography><Checkbox />Waxed or paper bags</Typography>
      <h3>Extras</h3>
      <Typography><Checkbox />Lunch</Typography>
      <Typography><Checkbox />Trowel and toilet paper, and a bag to pack out your t.p.</Typography>
      <Typography><Checkbox />Insect repellent</Typography>
      <Typography><Checkbox />Field guides and key</Typography>
      <Typography><Checkbox />Camera</Typography>
      <Typography><Checkbox />Flagging tape</Typography>
      <Typography><Checkbox />Two or more FRS walkie-talkies. This type of radio is small, effective over several miles and often modestly priced. FRS radios do not require a license.</Typography>
      <Typography><Checkbox />iNaturalist/Seek App can be helpful for a starting point for ID</Typography>
    </Container>
  )
}

export default Checklist; 