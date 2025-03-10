// profile.js

const API_URL = 'https://irasemenikhi-5500.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/';

// Получаем элементы
const profileContainer = document.getElementById('profile-container');

// Функция для получения данных пользователя
const fetchUserProfile = async () => {
  const authtoken = sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email");

  if (!authtoken) {
    window.location.href = "/login"; // Перенаправление на страницу входа, если нет токена
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/user`, {
      headers: {
        "Authorization": `Bearer ${authtoken}`,
        "Email": email,
      },
    });

    if (response.ok) {
      const user = await response.json();
      renderProfile(user); // Отображаем данные
    } else {
      throw new Error("Failed to fetch user profile");
    }
  } catch (error) {
    console.error(error);
    alert("Error fetching user profile");
  }
};

// Функция для отображения профиля
const renderProfile = (userDetails) => {
  // Проверяем, находимся ли в режиме редактирования
  const isEditMode = localStorage.getItem("editMode") === "true";
  
  if (isEditMode) {
    // Режим редактирования
    profileContainer.innerHTML = `
      <form id="profile-form">
        <label>
          Email:
          <input type="email" name="email" value="${userDetails.email}" disabled />
        </label>
        <label>
          Name:
          <input type="text" name="name" value="${userDetails.name}" />
        </label>
        <label>
          Phone:
          <input type="text" name="phone" value="${userDetails.phone}" />
        </label>
        <button type="submit">Save</button>
      </form>
      <button id="cancel-edit">Cancel</button>
    `;

    // Обработчик для отправки формы
    const form = document.getElementById('profile-form');
    form.addEventListener('submit', handleSubmit);
    
    // Обработчик для кнопки "Cancel"
    document.getElementById('cancel-edit').addEventListener('click', () => {
      localStorage.removeItem('editMode');
      fetchUserProfile(); // Перезагружаем данные
    });
  } else {
    // Режим просмотра
    profileContainer.innerHTML = `
      <h1>Welcome, ${userDetails.name}</h1>
      <p>Email: ${userDetails.email}</p>
      <p>Phone: ${userDetails.phone}</p>
      <button id="edit-button">Edit</button>
    `;

    // Обработчик для кнопки "Edit"
    document.getElementById('edit-button').addEventListener('click', handleEdit);
  }
};

// Функция для перехода в режим редактирования
const handleEdit = () => {
  localStorage.setItem("editMode", "true");
  fetchUserProfile(); // Перезагружаем данные с включенным режимом редактирования
};

// Функция для отправки обновлений профиля
const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const updatedDetails = {
    email: formData.get('email'),
    name: formData.get('name'),
    phone: formData.get('phone')
  };

  const authtoken = sessionStorage.getItem("auth-token");
  const email = sessionStorage.getItem("email");

  if (!authtoken || !email) {
    window.location.href = "/login";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/user`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${authtoken}`,
        "Content-Type": "application/json",
        "Email": email,
      },
      body: JSON.stringify(updatedDetails),
    });

    if (response.ok) {
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);
      localStorage.removeItem('editMode');
      fetchUserProfile(); // Перезагружаем профиль с новыми данными
      alert('Profile updated successfully!');
    } else {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error(error);
    alert('Error updating profile');
  }
};

// Инициализируем отображение профиля при загрузке страницы
fetchUserProfile();
