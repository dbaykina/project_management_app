import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CategoriesContext from "../context";

const TicketPage = ({ editMode }) => {
  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    description: "",
    category: "",
    priority: "",
    status: "не открыта",
    progress: 0,
    timestamp: new Date().toISOString(),
  });
  const { categories, setCategories } = useContext(CategoriesContext);

  const navigate = useNavigate();
  let { id } = useParams();

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    if (editMode) {
      const response = await axios.put(`http://localhost:8000/tickets/${id}`, {
        data: formData,
      });
      const success = response.status === 200;
      if (success) {
        navigate("/");
      }
    }
    if (!editMode) {
     
      const response = await axios.post("http://localhost:8000/tickets", {
        formData,
      });
      const success = response.status === 200;
      if (success) {
        navigate("/");
      }
    }
  };

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8000/tickets/${id}`);
  
    setFormData(response.data.data);
  };

  useEffect(() => {
    if (editMode) {
      fetchData();
    }
  }, []);
 

  return (
    <div className="ticket">
      <h1 className="ticket-title">
        {editMode ? "Редактировать Задачу" : "Создать Новую Задачу"}
      </h1>
      <div className="ticket-container">
        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="title">Название</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.title}
            />

            <label htmlFor="description">Описание</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={handleChange}
              required={true}
              value={formData.description}
            />

            <label>Категория</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories?.map((category, _index) => (
                <option value={category}>{category}</option>
              ))}
            </select>

            <label htmlFor="new-category">Новая Категория</label>
            <input
              id="new-category"
              name="category"
              type="text"
              onChange={handleChange}
              value={formData.category}
            />

            <label>Приоритетность</label>
            <div className="multiple-input-container">
              <input
                id="priority-1"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={1}
                checked={formData.priority == 1}
              />
              <label htmlFor="priority-1">1</label>
              <input
                id="priority-2"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={2}
                checked={formData.priority == 2}
              />
              <label htmlFor="priority-2">2</label>
              <input
                id="priority-3"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={3}
                checked={formData.priority == 3}
              />
              <label htmlFor="priority-3">3</label>
              <input
                id="priority-4"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={4}
                checked={formData.priority == 4}
              />
              <label htmlFor="priority-4">4</label>
              <input
                id="priority-5"
                name="priority"
                type="radio"
                onChange={handleChange}
                value={5}
                checked={formData.priority == 5}
              />
              <label htmlFor="priority-5">5</label>
            </div>

            {editMode && (
              <>
                <label htmlFor="progress">Прогресс</label>
                <input
                  type="range"
                  id="progress"
                  name="progress"
                  value={formData.progress}
                  min="0"
                  max="100"
                  onChange={handleChange}
                />

                <label>Статус задачи</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option  value="выполнена">
                    выполнена
                  </option>
                  <option  value="в процессе">
                    в процессе
                  </option>
                  <option  value="возникли сложности">
                    возникли сложности
                  </option>
                  <option  value="не открыта">
                    не открыта
                  </option>
                </select>
              </>
            )}

            <input className='send-button' type="submit" />
          </section>

          <section>
            <label htmlFor="owner">Владелец</label>
            <input
              id="owner"
              name="owner"
              type="owner"
              onChange={handleChange}
              required={true}
              value={formData.owner}
            />

            <label htmlFor="avatar">Аватар</label>
            <input
              id="avatar"
              name="avatar"
              type="url"
              onChange={handleChange}
            />
            <div className="img-preview">
              {formData.avatar && (
                <img src={formData.avatar} alt="image preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default TicketPage;
