const { Router } = require("express");
const CategoryController = require("../Controllers/CategoryController");
const CategoryCreateRequest = require("../Requests/CategoryCreateRequest");
const CategoryUpdateRequest = require("../Requests/CategoryUpdateRequest");

const adminRouter = Router();

adminRouter.get("/category", CategoryController.getCategoryWithCourseCount);
adminRouter.post("/category", CategoryCreateRequest, CategoryController.create);
adminRouter.patch(
  "/category/:id",
  CategoryUpdateRequest,
  CategoryController.update
);
adminRouter.delete("/category/:id", CategoryController.delete);

module.exports = adminRouter;
