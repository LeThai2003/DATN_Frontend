import HttpService from "@/api/httpService";

class MealRelationApi extends HttpService {
    getMealRelationByFilter =(filter: any)=> {
        return this.post(filter, 'list')
    };
    createMealRelation =(data: any)=> {
        return this.post(data, 'create');       
    };
    updateMealRelation =(id: number, data: any)=> {
        return this.put(id, data, 'update');
    };
    deleteMealRelation =(id: number)=> {
        return this.delete(id, 'delete');
    }    
}

export const mealRelationApi = new MealRelationApi("meal_relation");