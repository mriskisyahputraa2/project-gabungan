import Note from "../models/NoteModel.js";
import Product from "../models/ProductModel.js";
import Book from "../models/BookModel.js";
import { Op } from "sequelize";
import User from "../models/UserModel.js";

export const searchItems = async (req, res) => {
  const { query, type } = req.query;

  if (!query || !type) {
    return res.status(400).json({
      message: "Search query and type are required",
    });
  }

  try {
    let searchCriteria;
    let matchingItems;

    switch (type) {
      case "note":
        searchCriteria = {
          [Op.or]: [
            { title: { [Op.like]: `%${query}%` } },
            { content: { [Op.like]: `%${query}%` } },
            { "$user.name$": { [Op.like]: `%${query}%` } },
          ],
        };
        matchingItems = await Note.findAll({
          where: searchCriteria,
          include: [{ model: User, attributes: ["name"] }],
        });
        break;
      case "product":
        searchCriteria = {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { brand: { [Op.like]: `%${query}%` } },
            { "$user.name$": { [Op.like]: `%${query}%` } },
          ],
        };
        matchingItems = await Product.findAll({
          where: searchCriteria,
          include: [{ model: User, attributes: ["name"] }],
        });
        break;
      case "book":
        searchCriteria = {
          [Op.or]: [
            { name: { [Op.like]: `%${query}%` } },
            { genre: { [Op.like]: `%${query}%` } },
            { "$user.name$": { [Op.like]: `%${query}%` } },
          ],
        };
        matchingItems = await Book.findAll({
          where: searchCriteria,
          include: [{ model: User, attributes: ["name"] }],
        });
        break;
      default:
        return res.status(400).json({
          message: "Invalid search type",
        });
    }

    if (matchingItems.length === 0) {
      return res.status(404).json({
        message: `No ${type}s found matching the search query`,
      });
    }

    return res.json({
      items: matchingItems,
      message: `${
        type.charAt(0).toUpperCase() + type.slice(1)
      }s matching the search query retrieved successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
