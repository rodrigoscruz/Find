const knex = require('../database');


module.exports = {

    // Listar seções e subseções (tela da home)

    async index(request, response, next) {
        try {

            const category = await knex('categories').select('title', 'img_url','id_section', 'id');

            const section = await knex('sections');
    
            
            const mixed = section.map(items => {
    
                if(category.find(e => items.id === e.id_section)) {
    
                    return {
                        "Type": items.type,
                        "Section" : items.name,
                        "data": [category.filter(elements => elements.id_section === items.id)]
                    }
                
                } 
    
            });
    
            response.status(200).json(mixed);
            
        } catch (error) {
            next(error)

        }
       

    },

    // Listar todas as categorias (opções para tela de cadastro)

    async listCategories(request, response, next) {
        try {

            const { type } = request.query;
            
            if(type) {
                const categories = await knex('sections')
                .join('categories', 'sections.id', 'categories.id_section')
                .select('sections.type', 'categories.id', 'categories.title');

                const filterCategories = categories.map(elements => {

                    if(elements.type == type) {

                        return {
                            "id": elements.id,
                            "title": elements.title
                        }

                    } 

                });

                const filteredCategories = filterCategories.filter(item => item !== undefined)

                return response.json(filteredCategories);

            } else throw new Error('Nenhum tipo recebido')
            
        } catch (error) {
            next(error)
        }
    }

};