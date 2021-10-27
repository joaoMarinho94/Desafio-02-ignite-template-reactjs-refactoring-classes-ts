import { useEffect, useState } from "react";

import { Header } from "../../components/Header";
import api from "../../services/api";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";

export interface IFood {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type IFoodValuesForm = Omit<IFood, "id" | "available">;

export const Dashboard = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    api
      .get("/foods")
      .then(({ data }) => setFoods(data))
      .catch((error) => console.log(error));
  }, []);

  const handleAddFood = async (food: IFoodValuesForm) => {
    try {
      const { data } = await api.post("/foods", {
        ...food,
        available: true,
      });

      setFoods([...foods, data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateFood = async (food: IFoodValuesForm) => {
    try {
      const { data } = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
        ...food,
      });

      const foodIndex = foods.findIndex((f) => f.id === editingFood.id);

      setFoods((prevState) => {
        const prev = [...prevState];
        prev[foodIndex] = data;
        return prev;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodIndex = foods.findIndex((f) => f.id === editingFood.id);

    setFoods((prevState) => {
      const prev = [...prevState];
      prev.splice(foodIndex, 1);
      return prev;
    });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  const handleEditFood = (food: IFood) => {
    setEditModalOpen(true);
    setEditingFood(food);
  };

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
