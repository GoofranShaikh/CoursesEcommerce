const dboperations = require('../dboperations/MenuControllerSql');

const AddMenus = async (req, res) => {
    try {
        const InsertedItem = await dboperations.InsertMenus(req);
        console.log(InsertedItem,'InsertedItem')
        return res.status(201).json({ courseId: InsertedItem });
    } catch (error) {
        console.error('Error adding menus:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const GetAllMenus = async (req, res) => {
    try {
        const retrivedItem = await dboperations.GetMenus(req);
        console.log(retrivedItem,'InsertedItem')
        return res.status(200).json(retrivedItem);
    } catch (error) {
        console.error('Error retriving menus:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { AddMenus ,GetAllMenus};