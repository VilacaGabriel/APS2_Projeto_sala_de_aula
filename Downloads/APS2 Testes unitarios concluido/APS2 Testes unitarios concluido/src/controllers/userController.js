import { UserDTO } from "../dtos/userDTO.js";
import { UserService } from "../services/userService.js";

class UserController{
    constructor(){
        this.UserService = new UserService()
    }
    
    getAllUser = async(req, res) =>{
        try{
            const listUsers = await this.UserService.getAllUser();
            res.status(200).json(listUsers.map((User) => new UserDTO(User)));
        }
        catch(error){
            res.status(500).send(error.message)
        }
    }

    
    createUser = async (req, res)=>{
        try{
            //const newUser = await this.UserService.createUser(req.body);
            const newUser = await this.UserService.register(req.body);
            
            res.status(201).json({
                message: "User Criado com sucesso",
                User: new UserDTO(newUser),
            }
            )
        }
        catch(error){
            res.status(500).send(error.message)
        }
    
    };



    getUserById = async (req, res) =>{
        try{
            const UserById = await this.UserService.getUserById(req.params.id);
            if (!UserById){
            return res.status(404).send("User não encontrado")
            }
            res.status(200).json(new UserDTO(UserById))
            
        }
        catch(error){
            res.status(500).send(error.message)
        }
    };

    // searchUserByName = async(req, res) =>{
    //     try{
    //         const {name} = req.params;
    //         const Users = await this.UserService.searchAutorByName(name);
    //         if(Users.lenght === 0){
    //             return res.status(404).json({
    //                 message: "Não encontrado",
    //                 name: name,
    //         });
    //     }
    //         res.status(200).json(Users.map((User) => new UserDTO(User)));
    //     }
    //     catch(error){
    //         res.status(500).send(error.message)
    //     }
    // };
    
    updateUser = async(req, res) =>{
        try{
            const updateUser = await this.UserService.updateUser(req.params.id, req.body, {
                new: true,
            });
            if (!updateUser){
            return res.status(404).send("User não encontrado")
            }
            res.status(201).json({
                message: "User Criado com sucesso",
                Users: new UserDTO(updateUser),
            }
            )
        }
        catch(error){
            res.status(500).send(error.message)
        }
    }

    deletedUser = async (req, res) =>{
        try{
            const deleteUser = await this.UserService.deleteUser(req.params.id);
            if (!deleteUser){
            return res.status(404).send("User não encontrado")
            }
    
            res.status(200).json("Autor deletado"
            )
        }
        catch(error){
            res.status(500).send(error.message)
        }
    }
    
    }


//export default UserController;
export default new UserController();