const express = require('express');
const router = express.Router();

const Roles = require('../db/models/Roles');
const RolePrivileges = require('../db/models/RolePrivileges');
const role_privileges = require('../config/role_privileges');

const Response = require('../lib/Response');
const CustomError = require('../lib/Error');
const Enum = require('../config/Enum');

// GET api/roles
router.get('/', async (req, res) => {
    try {
        let roles = await Roles.find();
        res.json(Response.succesResponse(roles));
    } catch (err) {
        res.json(Response.errorResponse(err));
        res.status(errorResponse.code).json(errorResponse);
    }
});

// CREATE api/roles/add
router.post('/add', async(req, res) => {
    let body = req.body;

    try{
      if(!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', 'role_name field must be filled');
      if(!body.permissions || !Array.isArray(body.permissions || body.permissions.length == 0)){
        throw new CustomError(
          Enum.HTTP_CODES.BAD_REQUEST,
          "Validation Error!",
          "permissions  field must be an Array"
        );
      }

      let role = new Roles({
        role_name: body.role_name,
        is_active: body.is_active,
        created_by: req.user?.id,
      });
  
      await role.save();

      //permissions içerisindeki role, hemen yukarıda tanımlı olan rolesten geliyor
      for(let i = 0; i < body.permissions.length; i++){
        let priv = new RolePrivileges({
          role_id: role._id,
          permission: body.permissions[i],
          created_by: req.user?.id,
        });

        await priv.save();
      }

      res.json(Response.succesResponse({success: true}));
  
    } catch(err) {
        let errorResponse= Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
  
    }
});

// UPDATE /api/roles/update
router.post('/update', async(req, res) => {
    let body = req.body;
    try{
      if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');
     
      let updates = {};
  
      if(body.role_name) updates.role_name = body.role_name;
      if(typeof body.is_active === "boolean") updates.is_active = body.is_active;
     
      // permission tanımlı değilse bu alana girmez 
      if (body.permissions && Array.isArray(body.permissions) && body.permissions.length > 0) {

        let permissions = await RolePrivileges.find({ role_id: body._id });

        // body.permissions => ["category_view", "user_add"]
        // permissions => [{role_id: "abc", permission: "user_add", _id: "bcd"}];

        let removedPermissions = permissions.filter(x => !body.permissions.includes(x.permission));
        let newPermissions = body.permissions.filter(x => !permissions.map(p => p.permission).includes(x));

        if (removedPermissions.length > 0) {
            await RolePrivileges.remove({ _id: { $in: removedPermissions.map(x => x._id) } });
        }

        if (newPermissions.length > 0) {
            for (let i = 0; i < newPermissions.length; i++) {
                let priv = new RolePrivileges({
                    role_id: body._id,
                    permission: newPermissions[i],
                    created_by: req.user?.id
                });

                await priv.save();
            }
        }
    }
  
      await Roles.updateOne({_id: body._id}, updates);
      
      res.json(Response.succesResponse({success: true}));
  
    } catch(err) {
      let errorResponse= Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);  }
  });

  
  
// DELETE /api/roles/delete
router.post('/delete', async(req, res) => {
    let body = req.body;
    try{
        if(!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation Error!', '_id field must be filled');

        if(body._id){
            await RolePrivileges.remove({role_id: body._id});
        }
        await Roles.remove({_id: body._id});
        res.json(Response.succesResponse({success: true}));

    } catch(err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
    }
);


router.get('/role_privileges', async(req, res) => {
    res.json(role_privileges);
})


module.exports = router;