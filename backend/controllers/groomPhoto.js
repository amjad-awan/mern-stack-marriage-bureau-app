export const addGroom = async (req, res) => {
    try {
      const {
        requiredAge,
        requiredQualification,
        requiredSect,
        requiredHeight,
        requiredCity,
        requiredCast,
        ...groomData
      } = req.fields;
      const { photo } = req.files;
      console.log("req body 7777", {
        requiredAge,
        requiredQualification,
        requiredSect,
        requiredHeight,
        requiredCity,
        requiredCast,
        ...groomData,
      });
    
      const recordExists = await groomModel.findOne({
        phoneNumber: groomData.phoneNumber,
      });
      if (recordExists) {
        return res.status(400).json({
          success: false,
          error: true,
          message: "Data already exists with this phone number",
        });
      }
      const newGroom = new groomModel({
        requirements: {
          requiredAge,
          requiredQualification,
          requiredSect,
          requiredHeight,
          requiredCity,
          requiredCast,
        },
        ...groomData,
      });
      // if (photo) {
      //   newGroom.photo.data = Buffer.from(photo.data, 'base64');
      //   newGroom.photo.contentType = photo.contentType;
      // }
  
      if (photo) {
        newGroom.photo.data = fs.readFileSync(photo.path);
        newGroom.photo.contentType = photo.type;
      }
      const savedGroom = await newGroom.save();
      res.status(201).json({
        success: true,
        error: false,
        message: "New groom is added",
        data: savedGroom,
      });
    } catch (error) {
      console.error("Error adding groom:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "There was an error while adding groom",
      });
    }
  };