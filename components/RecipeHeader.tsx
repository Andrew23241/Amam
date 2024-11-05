import { Clock, Star, User2Icon } from "lucide-react";
import React from "react";

interface RecipeHeaderProps {
  title: string;
  difficulty: number;
  portion: string;
  category: string;
  heatup: number;
  heatdown: number;
  time: number;
}

function RecipeHeader({
  title,
  difficulty,
  portion,
  category,
  heatup,
  heatdown,
  time,
}: RecipeHeaderProps) {
  return (
    <div className="col-span-full bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center">
          <Star className="h-5 w-5 text-yellow-400 mr-1" />
          <span className="text-gray-600">Difficulty: {difficulty}/5</span>
        </div>

        <div className="flex items-center">
          <User2Icon className="h-5 w-5 text-blue-500 mr-1" />
          <span className="text-gray-600">Portion: {portion}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-green-500 mr-1" />
          {time > 0 ? (
            <span className="text-gray-600">
              Time: {time} min {heatup}/{heatdown}
            </span>
          ) : (
            <span className="text-gray-600">freeze {-time} hr</span>
          )}
        </div>
        <div className="text-gray-600">Category: {category}</div>
      </div>
    </div>
  );
}

export default RecipeHeader;
