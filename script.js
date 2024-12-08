const inputTarefa = document.getElementById('tarefa');
const btnAdicionar = document.getElementById('adicionar');
const list = document.getElementById('lista');

// Configuração do Firebasehttps
const firebaseConfig = {
  apiKey: "AIzaSyC7ex4WsC_RdPKLceXl6GMfKncoxGcWisM",
  authDomain: "tarefas-html.firebaseapp.com",
  databaseURL: "https://tarefas-html-default-rtdb.firebaseio.com",
  projectId: "tarefas-html",
  storageBucket: "tarefas-html.firebasestorage.app",
  messagingSenderId: "356672312956",
  appId: "1:356672312956:web:5aeabab0a667797f2f1bf9"
  };
  

// Inicialize o Firebase 
const app = firebase.initializeApp(firebaseConfig); 
const database = firebase.database(); 
const tasksRef = database.ref('/tasks');
  
  // Inicialize o Firestore
  const db = firebase.firestore();
  
  // Função para adicionar dados ao Firestore
  function adicionarDados() {
    const tarefa = document.getElementById('tarefa').value;
  // Função para recuperar dados do Firestore 
  function recuperarDados() { 
    db.collection("tarefas").get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => { 
            console.log(`${doc.id} => ${doc.data().texto}`); 
            // Aqui você pode adicionar o código para exibir os dados na sua lista 
            }); 
        }).catch((error) => { console.error("Erro ao recuperar documentos: ", error); 

        }); 
    } // Chame a função para recuperar os dados recuperarDados();
    // Adiciona um novo documento com um ID gerado automaticamente
    db.collection("tarefas").add({
      texto: tarefa,
      concluida: false
    })
    .then((docRef) => {
      console.log("Documento adicionado com ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
    });
  }
  
  // Evento de clique para adicionar dados
  document.getElementById('adicionar').addEventListener('click', adicionarDados);
  

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // verifica se o campo esta vazio
    if (textoTarefa  === ''){
        alert('Por favor, digite uma tarefa');
        return;
    }
     // criar o item da lista (li)
     const novoItem = document.createElement('li');
     novoItem.textContent = textoTarefa;
     
    // adicionar o evento de "marcar como concluida"
    novoItem.addEventListener('click', () => {
        novoItem.classList.toggle('concluido');
    });
     // criar o botão remover
     const botaoRemover = document.createElement('button');
     botaoRemover.textContent = 'Remover';
     botaoRemover.className = 'botao-remover';

     // adicionar evento ao botao remover
    botaoRemover.addEventListener('click', () => {
        list.removeChild(novoItem); // remove o item da lista
    });
    // adicionar o botao ao item da lista
    novoItem.appendChild(botaoRemover);

    // adicionar item da lista na lista (mãe)
    list.appendChild(novoItem);


    // Armazena a tarefa no Firebase
    tasksRef.push({
        text: textoTarefa,
        completed: false 
    });

   // Limpa o campo do input 
   inputTarefa.value = '';
}
btnAdicionar.addEventListener('click', adicionarTarefa);


      // Função para criar um item da lista 
      function criarItemLista(taskId, taskData) { 
        const novoItem = document.createElement('li'); 
        novoItem.textContent = taskData.text;

 // Adiciona o evento de "marcar como concluída" 
 novoItem.addEventListener('click', () => { 
    novoItem.classList.toggle('concluido'); 
    tasksRef.child(taskId).update({ completed: novoItem.classList.contains('concluido') }); 
    });
}


    // criar o botão remover
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover';
    botaoRemover.className = 'botao-remover';

    // adicionar evento ao botao remover
    botaoRemover.addEventListener('click', () => {
        tasksRef.child(taskId).remove(); // remove o item da lista
    });

    // adicionar o botao ao item da lista
    novoItem.appendChild(botaoRemover);

    // adicionar item da lista na lista (mãe)
    list.appendChild(novoItem);

    // Ouve as mudanças no nó "tasks" do Firebase 
    tasksRef.on('value', (snapshot) => { 
        list.innerHTML = ''; // Limpa a lista existente 
        
        snapshot.forEach(childSnapshot => { 
            const taskId = childSnapshot.key; 
            const taskData = childSnapshot.val(); 
            criarItemLista(taskId, taskData); }); 

        }); // Adiciona evento ao botão adicionar 
        btnAdicionar.addEventListener('click', adicionarTarefa);

    // limpar o campo do input pra deixar no jeito pra proxima tarefa
    inputTarefa.value = '';


btnAdicionar.addEventListener('click', adicionarTarefa);


//Replace with your actual Firebase configuration


 
  


/*
Você está perguntando sobre como adicionar o Firebase a um projeto, que é um serviço 
popular para armazenar dados em um banco de dados na nuvem. No entanto, você forneceu 
código HTML, e o Firebase normalmente interage com JavaScript.

Aqui está uma análise de como usar o Firebase com seu código HTML, tendo em mente que 
você precisará adicionar JavaScript para interagir com o Firebase:

1. Configure o Firebase:

Crie um projeto Firebase: Vá para o console do Firebase 
(https://console.firebase.google.com/) e crie um novo projeto.
Habilite o Realtime Database: No seu projeto Firebase, habilite o recurso
 Realtime Database. Este é o banco de dados que usaremos para armazenar sua lista 
 de tarefas.
Adicione o Firebase ao seu projeto:
Obtenha a configuração do Firebase: Você precisará obter um objeto de configuração do 
Firebase no console do Firebase (geralmente na seção "Configurações do projeto").
Inclua o Firebase SDK: Adicione o Firebase JavaScript SDK ao seu arquivo HTML. Você 
pode fazer isso incluindo a seguinte tag de script em seu <head>:

html
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>


2. Configure o JavaScript:

Inicialize o Firebase: Use o objeto de configuração do Firebase que você obteve do 
console para inicializar o Firebase no seu arquivo JavaScript:


script 

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();



Conecte-se ao Realtime Database: Agora você tem um objeto de banco de dados que permite
 ler e gravar em seu banco de dados Firebase.

3. Modifique seu JavaScript para usar o Firebase:

Armazenar tarefas:

Em vez de adicionar tarefas diretamente à lista HTML, você as armazenará no Firebase.
Use database.ref('/tasks') para obter uma referência ao nó "tasks" em seu banco de dados.
Use o método push() para adicionar novas tarefas ao nó "tasks", como este 


script

const tasksRef = database.ref('/tasks');

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // ... (rest of your function)

    // Store the task in Firebase
    tasksRef.push({
        text: textoTarefa,
        completed: false 
    });

    // ... (rest of your function)
}

    Recuperar tarefas:

Use o método on('value', ...) para ouvir alterações no nó "tasks".
Quando os dados mudarem, crie os itens da lista no seu HTML e atualize a UI.

script

tasksRef.on('value', (snapshot) => {
    list.innerHTML = ''; // Clear the existing list

    snapshot.forEach(childSnapshot => {
        const taskData = childSnapshot.val();
        const novoItem = document.createElement('li');
        novoItem.textContent = taskData.text;
        
        // ... (add your click and remove button logic)

        list.appendChild(novoItem);
    });
});

Lembre-se:

Este é um exemplo simplificado; você provavelmente precisará de uma lógica mais 
complexa para lidar com atualizações de dados, autenticação de usuário e tratamento 
de erros.
A documentação do Firebase (https://firebase.google.com/docs/) é um ótimo recurso para 
aprender mais.
Se você fornecer mais detalhes sobre seus requisitos específicos, posso lhe dar uma 
orientação mais personalizada sobre como integrar o Firebase ao seu projeto.
*/




//Replace with your actual Firebase configuration


 
  


/*
Você está perguntando sobre como adicionar o Firebase a um projeto, que é um serviço 
popular para armazenar dados em um banco de dados na nuvem. No entanto, você forneceu 
código HTML, e o Firebase normalmente interage com JavaScript.

Aqui está uma análise de como usar o Firebase com seu código HTML, tendo em mente que 
você precisará adicionar JavaScript para interagir com o Firebase:

1. Configure o Firebase:

Crie um projeto Firebase: Vá para o console do Firebase 
(https://console.firebase.google.com/) e crie um novo projeto.
Habilite o Realtime Database: No seu projeto Firebase, habilite o recurso
 Realtime Database. Este é o banco de dados que usaremos para armazenar sua lista 
 de tarefas.
Adicione o Firebase ao seu projeto:
Obtenha a configuração do Firebase: Você precisará obter um objeto de configuração do 
Firebase no console do Firebase (geralmente na seção "Configurações do projeto").
Inclua o Firebase SDK: Adicione o Firebase JavaScript SDK ao seu arquivo HTML. Você 
pode fazer isso incluindo a seguinte tag de script em seu <head>:

html
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>


2. Configure o JavaScript:

Inicialize o Firebase: Use o objeto de configuração do Firebase que você obteve do 
console para inicializar o Firebase no seu arquivo JavaScript:


script 

// Replace with your actual Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();



Conecte-se ao Realtime Database: Agora você tem um objeto de banco de dados que permite
 ler e gravar em seu banco de dados Firebase.

3. Modifique seu JavaScript para usar o Firebase:

Armazenar tarefas:

Em vez de adicionar tarefas diretamente à lista HTML, você as armazenará no Firebase.
Use database.ref('/tasks') para obter uma referência ao nó "tasks" em seu banco de dados.
Use o método push() para adicionar novas tarefas ao nó "tasks", como este 


script

const tasksRef = database.ref('/tasks');

function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();

    // ... (rest of your function)

    // Store the task in Firebase
    tasksRef.push({
        text: textoTarefa,
        completed: false 
    });

    // ... (rest of your function)
}

    Recuperar tarefas:

Use o método on('value', ...) para ouvir alterações no nó "tasks".
Quando os dados mudarem, crie os itens da lista no seu HTML e atualize a UI.

script

tasksRef.on('value', (snapshot) => {
    list.innerHTML = ''; // Clear the existing list

    snapshot.forEach(childSnapshot => {
        const taskData = childSnapshot.val();
        const novoItem = document.createElement('li');
        novoItem.textContent = taskData.text;
        
        // ... (add your click and remove button logic)

        list.appendChild(novoItem);
    });
});

Lembre-se:

Este é um exemplo simplificado; você provavelmente precisará de uma lógica mais 
complexa para lidar com atualizações de dados, autenticação de usuário e tratamento 
de erros.
A documentação do Firebase (https://firebase.google.com/docs/) é um ótimo recurso para 
aprender mais.
Se você fornecer mais detalhes sobre seus requisitos específicos, posso lhe dar uma 
orientação mais personalizada sobre como integrar o Firebase ao seu projeto.
*/


