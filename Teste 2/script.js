// script.js

// Seleciona o formulário, o campo de texto e a lista de usuários no DOM
const form = document.getElementById("userForm");
const input = document.getElementById("userName");
const userList = document.getElementById("userList");

// Carrega a lista de usuários do localStorage ou inicializa vazia
let users = JSON.parse(localStorage.getItem("users")) || [];

// Função para renderizar a lista de usuários no DOM
function renderUsers() {
  // Limpa o conteúdo atual da lista para evitar duplicações
  userList.innerHTML = "";

  // Itera sobre cada usuário no array e cria elementos no DOM
  users.forEach((user) => {
    // Cria um item de lista <li>
    const li = document.createElement("li");
    li.textContent = user.name;

    // Adiciona a classe "completed" se o usuário estiver marcado como concluído
    if (user.completed) {
      li.classList.add("completed");
    }

    // Cria um botão para excluir o usuário
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete-btn");

    // Adiciona evento ao botão para excluir o usuário
    deleteBtn.addEventListener("click", () => {
      removeUser(user.id); // Remove o usuário com base no ID
    });

    // Adiciona evento para alternar "completado" no clique do item da lista
    li.addEventListener("click", () => {
      toggleComplete(user.id); // Marca/desmarca o usuário como concluído
    });

    // Adiciona o botão ao item de lista
    li.appendChild(deleteBtn);

    // Adiciona o item de lista ao DOM
    userList.appendChild(li);
  });
}

// Função para adicionar um usuário
function addUser(name) {
  // Adiciona um novo usuário com um ID único
  const newUser = {
    id: Date.now(), // Gera um ID único com base no timestamp atual
    name,
    completed: false,
  };
  users.push(newUser); // Adiciona o novo usuário ao array

  // Atualiza o localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Renderiza a lista novamente
  renderUsers();
}

// Função para remover um usuário com base no ID
function removeUser(id) {
  // Filtra usuários para excluir aquele com o ID correspondente
  users = users.filter((user) => user.id !== id);

  // Atualiza o localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Renderiza a lista novamente
  renderUsers();
}

// Função para alternar o status "completed" de um usuário com base no ID
function toggleComplete(id) {
  // Itera sobre os usuários e alterna o status do que possui o ID correspondente
  users = users.map((user) => {
    if (user.id === id) {
      return { ...user, completed: !user.completed }; // Alterna o status
    }
    return user; // Retorna outros usuários inalterados
  });

  // Atualiza o localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Renderiza a lista novamente
  renderUsers();
}

// Adiciona evento de submissão ao formulário para adicionar novos usuários
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Impede o comportamento padrão de recarregar a página
  const userName = input.value.trim(); // Obtém o valor do input

  // Verifica se o campo não está vazio
  if (userName) {
    addUser(userName); // Adiciona o novo usuário
    input.value = ""; // Limpa o campo de entrada
  }
});

// Faz uma requisição à API para carregar uma lista inicial de usuários (apenas uma vez)
fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json()) // Converte a resposta para JSON
  .then((data) => {
    // Filtra a API para evitar duplicatas baseadas no "id"
    const novosUsuarios = data
      .slice(0, 5)
      .filter((user) => !users.some((u) => u.name === user.name));

    // Adiciona os novos usuários ao array
    novosUsuarios.forEach((user) => {
      users.push({ id: user.id, name: user.name, completed: false });
    });

    // Atualiza o localStorage com os usuários carregados
    localStorage.setItem("users", JSON.stringify(users));

    // Renderiza a lista com os novos usuários
    renderUsers();
  })
  .catch((error) =>
    console.error("Erro ao carregar os usuários da API:", error)
  );

// Renderiza a lista ao carregar a página
renderUsers();
