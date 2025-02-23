// Objeto do usuário
const usuario = { nome: "Gabriel", matricula: "987654", pendencia: false, acessibilidade: true };

// Lista de objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// Função para reserva do armário, incluindo as regras.
function reservarArmario() {
  // Obter tipo de armário selecionado pelo usuário no HTML.
  let tipoSelecionado = document.getElementById("tipoArmario").value;

  // Filtrar armários disponíveis e acessíveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

  // Caso não exista armário disponível, retorna uma mensagem para o usuário.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }

  // Caso exista armário(s) disponível, sorteamos uma opção.
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

  // Registrar a data e hora da reserva no objeto do armário.
  const dataHoraReserva = new Date();
  armarioSorteado.dataHoraReserva = dataHoraReserva.toLocaleString("pt-BR"); 

  // Calcular a data e hora de entrega (24 horas após a reserva).
  const dataHoraEntrega = new Date(dataHoraReserva.getTime() + 24 * 60 * 60 * 1000); 
  armarioSorteado.dataHoraEntrega = dataHoraEntrega.toLocaleString("pt-BR");

  // Atualizar o status do armário para indisponível.
  armarioSorteado.status = false;

  // Atualizar a pendência do usuário para verdadeira.
  usuario.pendencia = true;

  // Exibir a mensagem de reserva com a data e hora de entrega.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Data de entrega: ${armarioSorteado.dataHoraEntrega}.`;

  console.log("Usuário:", usuario);
  console.log("Armários:", armarios);
}