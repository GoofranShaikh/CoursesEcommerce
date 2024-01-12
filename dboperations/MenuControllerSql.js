const dbconfig=require('../dbconfig');
const mssql =require('mssql')

async function InsertMenus(req){
    const {MenuName,MenuLink} = req.body
    const sp='InsertMenus';
    const pool= await mssql.connect(dbconfig);
    const InsertedMenu = await pool.request()
                        .input('MenuItemName',mssql.NVarChar,MenuName)
                        .input('MenuItemLink',mssql.NVarChar,MenuLink)
                        .output('InsertedMenuItemID',mssql.Int)
                        .execute(sp)
                        return InsertedMenu.output.InsertedMenuItemID
}

async function GetMenus(req){
    // const {roleId} = req.body;
    try {
        let query= 'SELECT * from menus'
        const pool = await mssql.connect(dbconfig);
        const getAllMenus= await pool.request()
                           .query(query);
        return getAllMenus.recordsets[0];
    } catch (error) {
        return error
    }
   

}

module.exports={InsertMenus,GetMenus}