const express = require("express")
const EmployeeModel = require("../models/Employee")

const routes = express.Router()
const {protect} = require('../middleware/authMiddleware')
routes.get("/employees", async (req, res) => {
    
    try{
        const employees = await EmployeeModel.find()
        res.status(200).send(employees)
    } catch(error){
        res.status(500).send(error)

    }
})
routes.post("/employees", async (req, res) => {
    try {
        const newEmployee = new EmployeeModel(req.body)
        await newEmployee.save()
        res.status(200).send(newEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
    
})


routes.post("/employee/:employeeid", async (req, res) => {
    
    try {
        const updatedEmployee = await updatedEmployee.findByIdAndUpdate(req.params.id, req.body)
       
        res.status(200).send(updatedEmployee)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Delete By ID
routes.delete("/employee/:employeeid", async (req, res) => {
    
    try {
        const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.employeeid)
        
        if(!deletedEmployee){
            res.status(500).send(error)
        }
        res.status(200).send("The Employee was deleted")
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get By ID
routes.get("/employee/:employeeid", async (req, res) => {
    try {
        const employee = await EmployeeModel.findById(req.params.employeeid)
        res.status(200).send(employee)
    } catch (error) {
        res.status(500).send(error)
    }
})

//Get All in sorted order
routes.get("/employee/sort", (req, res) => {
    res.send({message: "Get All Employees in sorted order"})
})

module.exports = routes