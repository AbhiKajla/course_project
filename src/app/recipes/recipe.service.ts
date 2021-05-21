import { Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  public recipe: Recipe[] = [
    new Recipe('My First Recipe',
      'Garlic Potatoes',
      'https://www.aberdeenskitchen.com/wp-content/uploads/2020/09/Parmesan-Garlic-Roasted-Potatoes-6.jpg',
      [
        new Ingredient('potatoes', 4),
        new Ingredient('garlic sauce', 1),
        new Ingredient('spices', 1)
      ]),
    new Recipe('My Second Recipe',
      'Poutine',
      'https://i.pinimg.com/736x/de/ab/e4/deabe4cdd260ad1ec0eb6a5e982cfb89.jpg',
      [
        new Ingredient('French Fries', 1),
        new Ingredient('Sauces', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipe() {
    return this.recipe.slice();
  }

  getRecipes(index: number){
    return this.recipe[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipe.push(recipe);
    this.recipesChanged.next(this.recipe.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipe[index] = newRecipe;
    this.recipesChanged.next(this.recipe.slice());
  }

  deleteRecipe(index: number){
    this.recipe.slice(index, 1);
    this.recipesChanged.next(this.recipe.slice());
  }
}
