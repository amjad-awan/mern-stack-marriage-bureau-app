import groomModel from "../models/groomModel.js";
import fs from "fs";

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

// export const getGrooms = async (req, res) => {
//   try {
//     // Extract query parameters
//     const { page = 1, limit = 10, cast,search, gender,name, height, qualification, martialStatus, sect, city, nationality } = req.query;
//     const filter = {};
//     if (cast) filter.cast = cast;
//     if (name) filter.name = name;
//     if (gender) filter.gender = gender;
//     if (height) filter.height = height;
//     if (qualification) filter.qualification = qualification;
//     if (martialStatus) filter.martialStatus = martialStatus;
//     if (sect) filter.sect = sect;
//     if (city) filter.city = city;
//     if (nationality) filter.nationality = nationality;
//     // Build pagination options
//     const options = {
//       limit: parseInt(limit), // Convert string to number
//       skip: (parseInt(page) - 1) * parseInt(limit), // Calculate the offset
//     };
//     console.log("options",filter,options)

//     // Fetch grooms based on the filter and pagination options
//     const grooms = await groomModel.find(filter, null, options);

//     // Fetch total count of grooms matching the filter
//     const totalGroomsCount = await groomModel.countDocuments(filter);
// console.log("grooms",grooms)
//     // Respond with the fetched grooms and pagination metadata
//     res.status(200).json({
//       success: true,
//       error: false,
//       data: grooms,
//       page: parseInt(page),
//       limit: parseInt(limit),
//       totalPages: Math.ceil(totalGroomsCount / parseInt(limit)),
//       totalGrooms: totalGroomsCount,
//       message: "Grooms fetched",
//     });
//   } catch (error) {
//     console.error("Error fetching grooms:", error);
//     res.status(500).json({
//       success: false,
//       error: true,
//       message: "There was an error while fetching grooms",
//     });
//   }
// };


// export const getGrooms = async (req, res) => {
//   try {
export const getSingleGroom = async (req, res) => {
  try {
    // Extract query parameters
    const { id } = req.params;

    const grooms = await groomModel.findOne({_id:id});

    res.status(200).json({
      success: true,
      error: false,
      data: grooms,
      message: "Groom fetched",
    });
  } catch (error) {
    console.error("Error fetching grooms:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while fetching grooms",
    });
  }
};
export const getGrooms = async (req, res) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 10,
      search,
      gender,
      height,
      qualification,
      martialStatus,
      sect,
      city,
      cast,
      nationality,
    } = req.query;
    const filter = {};
    const searchRegex = new RegExp(search, "i"); // Case-insensitive regex for search

    // Apply filter conditions for search on multiple fields
    if (search) {
      filter.$or = [
        { name: { $regex: searchRegex } },
        { city: { $regex: searchRegex } },
        { sect: { $regex: searchRegex } },
        { phoneNumber: { $regex: searchRegex } },
        { cast: { $regex: searchRegex } },
      ];
    }

    // Apply additional filter conditions for other fields
    if (gender) filter.gender = gender;
    if (height) filter.height = height;
    if (qualification) filter.qualification = qualification;
    if (martialStatus) filter.martialStatus = martialStatus;
    if (sect) filter.sect = sect;
    if (city) filter.city = city;
    if (nationality) filter.nationality = nationality;
    if (cast) filter.cast = cast;

    // Build pagination options
    const options = {
      limit: parseInt(limit), // Convert string to number
      skip: (parseInt(page) - 1) * parseInt(limit), // Calculate the offset
    };

    // Fetch grooms based on the filter and pagination options
    const grooms = await groomModel.find(filter, null, options);


    // Fetch total count of grooms matching the filter
    const totalGroomsCount = await groomModel.countDocuments();
    // Respond with the fetched grooms and pagination metadata
    res.status(200).json({
      success: true,
      error: false,
      data: grooms,
      // page: parseInt(page),
      // limit: parseInt(limit),
      // totalPages: Math.ceil(totalGroomsCount / parseInt(limit)),
      totalGrooms: totalGroomsCount,
      message: "Grooms fetched",
    });
  } catch (error) {
    console.error("Error fetching grooms:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while fetching grooms",
    });
  }
};
