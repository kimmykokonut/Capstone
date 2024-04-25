import { Link } from "react-router-dom";

const Resources = () => {
  return (
    <>
      <h1>OMS Resource List</h1>
      <hr />
      <h3>What to bring</h3>
      <Link to="/resources/checklist">Foraging checklist</Link>
      <hr />
      <h3>USFS Northwest Emergency Closure<a href="https://usfs.maps.arcgis.com/apps/webappviewer/index.html?id=8e69381e35144962a835ee59aafba153&extent=-13824681.7736%2C5524992.5059%2C-13254461.5425%2C5790687.6163%2C102100"> Map</a> (fires, roads)</h3>
      <hr />
      <h3>Permits and Mushroom Maps</h3>
      <h4>Mt Hood National Forest <a href="https://www.fs.usda.gov/detail/mthood/passes-permits/forestproducts/?cid=stelprd3793091">permit info</a></h4>
      <p>Free, 1 gallon per person, per day</p>
      <h4>Mt Hood Mushroom Harvest Maps</h4>
      <ul>
        <li><a href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395147.pdf">Barlow & Hood River Ranger District</a></li>
        <li><a href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395148.pdf">Clackamas River Ranger District</a></li>
        <li><a href="https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5395150.pdf">Zigzag Ranger District</a></li>
      </ul>
      <hr />
      <h4>Gifford Pinchot National Forest <a href="https://www.fs.usda.gov/detail/giffordpinchot/passes-permits/forestproducts/?cid=fsbdev3_004906">Info</a></h4>
      <p>Online mushroom harvest <a href="https://gp.fs2c.usda.gov/gp/">permit</a></p>
      <p><a href="https://store.avenza.com/products/gifford-pinchot-nf-special-forest-products-map-us-forest-service-r6-pacific-northwest-region-waor-map">Harvest map</a></p>
      <p></p>
      <hr />
      <h3>Parking Passes</h3>
      <p>Federal: Forest Service: <a href="https://www.fs.usda.gov/detail/r6/passes-permits/recreation/?cid=fsbdev2_027010">NW Forest Parking Pass</a></p>
      <p>Federal: <a href="https://www.nps.gov/planyourvisit/passes.htm">America the Beautiful</a></p>
      <p>State: <a href="https://www.discoverpass.wa.gov/143/Washington-Recreation-Lands?gclid=CjwKCAjwndCKBhAkEiwAgSDKQSQa468hTsmRuFIsqZpaBBEQKtL1P5cow4odOns6N-nKOzvLOklGhxoCRbcQAvD_BwE">Washington Discover Pass</a></p>
      <p>State: <a href="https://store.oregonstateparks.org/">Oregon State Parks</a></p>
      <p>State: Oregon Fish & Wildlife <a href="https://odfw.huntfishoregon.com/login">(Sauvie Island)</a></p>
      <hr />
      <h3>Regulations by location</h3>
      <p>Portland City Parks/Metro: Foraging not allowed.</p>
      <p>State</p>
      <ul>
        <li>Oregon State Forest Lands: If collecting for personal use, no permit for collecting from state forestland in the Astoria, Tillamook, Forest Grove, North Cascade, or West Oregon Districts.  The limit for personal use is one gallon per vehicle at any one time. No parking permit needed.</li>
        <li>Oregon State Parks and Recreation Areas: Oregon state law 736-010-0055 states, “Unless otherwise posted a person may gather for personal consumption of berries, fruits, mushrooms, or similar edibles in quantities not to exceed five gallons per person per day.”  OR State parking pass needed.
        </li>
        <li>Washington State Park: No permit needed. 2 gallons per person per day. WA Discover parking pass needed.</li>
        <li>Washington DNR and wildlife areas: No permit needed. 5 gallons per person.
        </li>
        <li><a href="https://odfw.huntfishoregon.com/login">Oregon Fish and Wildlife</a>, 5 gal/day. Free permit (sauvie, see below). Parking permit needed $10/day; $30/year.
        </li>
        <li>Sauvie Island mushroom permit (free): email/call: Office Coordinator. Offices open 5/1
        </li>
      </ul>
      <p>Federal</p>
      <ul>
        <li>Bureau of Land Management (BLM) – There are no requirements for a permit to collect mushrooms for personal use on lands managed by the BLM.  Up to 1 gallon of mushrooms per person per day.
        </li>
        <li>National Parks and National Monuments – No foraging allowed. Wilderness Areas – You may collect and consume mushroom within Wilderness areas.  You may not remove mushrooms from Wilderness areas. Includes Columbia river gorge scenic area.
        </li>
        <li>USFS: NW Forest pass (or America the Beautiful pass) needed May 15-October 1
        </li>
        <ul>
          <li>Mt Hood NF: A permit is required, currently permit waived until offices open summer 2022, but need to carry mushroom map. Online permit in the works.  A permit can be obtained by mail or in person at Zigzag Ranger District. It is prohibited to collect forest products in wilderness areas, Old Maid Flats, developed recreation sites, or other areas normally closed to harvest. Personal use mushroom harvest is limited to 1 gallon per day and a total of 10 gallons per year. Entering fire closure areas to collect mushrooms or other forest products is prohibited. </li>
          <li>Gifford Pinchot NF-Free permit available online or at local ranger district office.  Print or download to phone; must be on person while hunting. Up to 2 gallons a day & up to 10 days a calendar year, totaling up to 20 gallons of mushrooms per year.</li>
          <li>Siuslaw National Forest (Central Oregon Coast) – No permit or fee for quantities less than one gallon per person per day. Up to six matsutake mushrooms per day for incidental/non-commercial use. To remove their commercial value, cut all matsutake mushrooms in half length-wise.
          </li>
          <li><a href="https://www.fs.usda.gov/detail/ochoco/news-events/?cid=FSEPRD579783">Ochoco National Forest</a> (Central Oregon, popular for Morels & Spring Boletes) – A free use permit allows you to gather up to two gallons per person per day – details here. You may obtain a personal use permit at a US Forest Service Office or Ranger Station
          </li>
          <li>Willamette National Forest (Central Cascade Range), Deschutes, Fremont-Winema, and Umpqua National Forest – These four forests all issue a free use permit that is valid for any of these four forests. The Willamette National Forest is no longer requiring a permit for collecting up to 1 gallon of mushrooms (other than Matsutake), per day, for personal use/consumption.   Important – Everyone (including personal use) must have a permit to pick Matsutake. Link to <a href="https://www.fs.usda.gov/detail/deschutes/home/?cid=fseprd950012">Matsutake permit</a> process for 2021. All Willamette National Forest Offices and ranger stations are still issuing personal use mushroom permits for those who wish to collect up to 2 gallons per day, and as a convenience for those visiting the forests that do require a permit. Permits expire on December 31st of each year. </li>
          <li>A permit is not required to collect less than one gallon in Oregon or less than five gallons in Washington in the Malheur, Umatilla, and Wallowa-Whitman National Forests.
          </li>
        </ul>
      </ul>
      <h3>Miscellaneous info</h3>
      <p><strong>Camp Grounds</strong>: Rules for a campground may differ from the general rules for the park or forest lands in which the campground resides.  Always check to see if there are any signs about picking mushrooms and/or forest products.  If there are no signs, follow the rules for the park or forest land the campground is located within. Fortunately, many campgrounds close down sections in the fall, or in some cases an entire campground closes.  Picking in a closed area or campground is best.  If you do go into an occupied area do not disturb the campers.</p>
    </>
  )
}
export default Resources;