const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try{
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  
  if (!data || data.length === 0) {
    return res.status(404).render("404", { title: "Classification Not Found", nav: await utilities.getNav() })
  }

  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}catch (error){
  next(error) // Forward the error to the error handler middleware
  }


}

/* ***************************
 *  Deliver specific vehicle detail view
 * ************************** */
invCont.getVehicleDetail = async function (req, res, next) {
  
  try{
    const inventoryId = req.params.inventoryId; // Get the vehicle's inventory ID from the URL
  const vehicleData = await invModel.getVehicleById(inventoryId); // Fetch vehicle data from the model

  if (!vehicleData) {
    return res.status(404).render("404", { title: "Vehicle Not Found", nav: await utilities.getNav() }); // Render a 404 page if not found
  }
  


  let nav = await utilities.getNav(); // Get navigation
  res.render("./inventory/vehicleDetail", {
    title: `${vehicleData.inv_make} ${vehicleData.inv_model}`, // Set the page title dynamically
    nav, // Navigation
    vehicle: vehicleData, // Pass the vehicle data to the view
  })
}catch(error){
  next(error)
}

}

module.exports = invCont