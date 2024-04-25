const Checklist = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
    <button onClick={handlePrint}>Print Me</button>
      <h2>Mushroom Hunting Checklist</h2>
      <p>Mushroom hunting is generally a fun day trip!  But we all know that it is not all that difficult to get turned around and lost.  PLEASE be prepared with the following items, and ask yourself: Could I survive a night in the woods with the gear that I am carrying?</p>
      <h3>Essential Items</h3>
      <ul>
        <li><strong>Whistle</strong></li>
        <li><strong>Watch</strong></li>
        <li><strong>Permits</strong>: Foraging and/or Parking Permits as required</li>
        <li><strong>Water</strong>(pack extra)</li>
        <li>High energy snacks (trail mix, dried fruit, power bars, etc)</li>
        <li>Sun protection (hat, sunblock)</li>
        <li>Navigation: Good topographic map of the area that is accessible offline</li>
        <li>Compass</li>
        <li>Flashlight or headlamp with extra batteries</li>
        <li>Extra clothing </li>
        <li>First aid kit</li>
        <li>Space blanket or 2 large heavy duty trash bags</li>
        <li>Mirror or signaling device</li>
        <li>Waterproof matches or lighter</li>
        <li>Fire starter or candle</li>
        <li>Notepaper and pencil</li>
      </ul>

      <h3>Clothes: <em>either on your body or in  your backpack</em></h3>
      <ul>
        <li>Synthetic (polyester, nylon, fleece, wool, or silk) layers. Please, NO COTTON or JEANS</li>
        <li>Rain jacket with hood</li>
        <li>Rain pants</li>
      </ul>

      <ul>
        <li>Sturdy, moisture-proof boots (no street shoes, tennis shoes or sandals)</li>
        <li>Hat(s) <em>for warmth/shade from sun/repel rain</em></li>
        <li>Mittens or gloves </li>
        <li>Brightly colored / Highly visible / Reflective vest or jacket</li>
      </ul>

      <h3>In your flat-bottomed basket:</h3>
      <ul>
        <li>Knife, brightly marked</li>
        <li>Brush for cleaning mushrooms prior to putting them in your basket</li>
        <li>Waxed or paper bags</li>
      </ul>

      <h3>Extras</h3>
      <ul>
        <li>Lunch</li>
        <li>Trowel and toilet paper, and a bag to pack out your t.p.</li>
        <li>Insect repellent</li>
        <li>Field guides and key</li>
        <li>Camera</li>
        <li>Flagging tape</li>
        <li>Two or more FRS walkie-talkies. This type of radio is small, effective over several miles and often modestly priced. FRS radios do not require a license.</li>
      </ul>
    </>
  )
}

export default Checklist; 