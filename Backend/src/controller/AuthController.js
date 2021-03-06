const knex = require('../database')
const bcrypt = require('bcrypt');


module.exports = {

     // Login para Usuários (empresa/cliente)

     async login(request, response, next) {

        try {

          const { email, password } = request.body;
            
          const client = await knex('clients')
          .where({ 
            email,
            "deleted_at": null 
          });
          
          const company = await knex('companies')
          .where({ 
            email,
            "deleted_at": null 
          });
          
          
          if (client.length == 0 && company.length == 0) {

            return response.status(400).send('Usuário não encontrado')

          } 
          

          function validation() {
            if(company.length !== 0) {

              return {
                "type": "company",
                "data": company[0]
              }

            }else {

              return {
                "type": "client",
                "data": client[0]
              }
              
            }
          }
          
          let user = validation();

        
          if(await bcrypt.compare(password, user.data.password)) {

            const res = user;

            delete res.data.password;
            delete res.data.deleted_at;

            return response.json(res)

          } 
          else {

            return response.status(403).send()

          } 
  
        } catch (error) 
        {  
          next(error)
        }
      

   }

}
