import groomModel from "../models/groomModel.js";

export const addGroom = async (req, res) => {
  try {
    const addNewGroom = new groomModel(req.body);
    console.log(addNewGroom);
    // check if data already exist

    const recordExists = await groomModel.findOne({phoneNumber:req.body.phoneNumber});
    console.log("recordExists",recordExists);
    if (recordExists) {
      res.status(200).json({
        success: false,
        error: true,
        message: " data already exists with this phone number",
      });
      return
    }

    const saved = await addNewGroom.save();
    console.log("saved", saved);

    console.log();
    if (saved) {
      res.status(200).json({
        success: true,
        error: false,
        message: "new groom is added",
      });
    } else {
      res.status(300).json({
        success: false,
        error: true,
        message: "There is error while adding groom",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There is error while adding groom",
    });
  }
};
