import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

//create a new category
const createCategory = asyncHandler(async(req, res) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.json({error: "A name is required"})
        }
        const existingCategory = await Category.findOne({name})
            
        if(existingCategory) {
                return res.json({error: "This category already exists"})
        }

        const category = await new Category({name}).save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
});

const updateCategory = asyncHandler(async(req, res) => {
    try {
        const{name} = req.body;
        const{categoryId} = req.params

        const category = await Category.findOne({_id: categoryId})

        if(!category){
            return res.status(404).json({error: "Category is not found"})
        }

        category.name = name

        const updatedCategory = await category.save();
        res.json(updatedCategory)

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

const deleteCategory = asyncHandler(async(req,res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.categoryId)
        res.json(deleted)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

const listofCategories = asyncHandler(async(req, res) => {
    try {
        const allCategories = await Category.find({})
        res.json(allCategories)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
    }
})

const readCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id})
        res.json(category)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error: "Cannot read category"})
    }
})

export {createCategory, updateCategory, deleteCategory, listofCategories, readCategory}