
// Estado básico
let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
let leads = JSON.parse(localStorage.getItem("leads") || "[]");
let atendimentos = JSON.parse(localStorage.getItem("atendimentos") || "[]");
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

function toggleSenha(){
  const inp = document.getElementById("loginSenha");
  if(!inp) return;
  inp.type = inp.type === "password" ? "text" : "password";
}

function preencherEstadosECidades(){
  const est = document.getElementById("estadoCorretor");
  const cid = document.getElementById("cidadeCorretor");
  if(est && !est.options.length){
    ["MG","SP","RJ","ES"].forEach(uf=>{
      const o=document.createElement("option"); o.value=uf; o.textContent=uf; est.appendChild(o);
    });
  }
  if(cid && !cid.options.length){
    ["Belo Horizonte","São Paulo","Rio de Janeiro","Vitória"].forEach(c=>{
      const o=document.createElement("option"); o.value=c; o.textContent=c; cid.appendChild(o);
    });
  }
}

function login(){
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();
  const achado = usuarios.find(u=>u.email===email && u.senha===senha);
  if(achado){
    usuarioLogado = achado;
  } else {
    alert("Usuário não encontrado. Para testar, criaremos um usuário Master temporário.");
    usuarioLogado = {nome:"Master", email:"master@demo", papel:"master", foto:null};
    if(!usuarios.length){
      usuarios.push(usuarioLogado);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  }
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  document.getElementById("loginPage").style.display="none";
  document.getElementById("plataforma").style.display="block";
  document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
  document.getElementById("papelUsuario").textContent = usuarioLogado.papel;
  document.getElementById("bemVindo").textContent = usuarioLogado.nome;
  if(usuarioLogado.foto){
    const fu = document.getElementById("fotoUsuario");
    if(fu) fu.src = usuarioLogado.foto;
  }
  if(typeof renderCorretores==="function") renderCorretores();
  if(typeof renderLeads==="function") renderLeads();
  atualizarCounters();
  preencherEstadosECidades();
  if(typeof atualizarSelectCorretores==="function") atualizarSelectCorretores();
  if(typeof atualizarSelectClientes==="function") atualizarSelectClientes();
}

function mostrar(id){
  document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
  const alvo = document.getElementById(id);
  if(alvo){ alvo.classList.add("active"); }
}

function logout(){
  localStorage.removeItem("usuarioLogado");
  document.getElementById("plataforma").style.display="none";
  document.getElementById("loginPage").style.display="block";
}

function atualizarCounters(){
  const qc = document.getElementById("qtdCorretores");
  const ql = document.getElementById("qtdLeads");
  const qa = document.getElementById("qtdAberto");
  const qand = document.getElementById("qtdAndamento");
  const qf = document.getElementById("qtdFinalizado");
  if(qc) qc.textContent = usuarios.length;
  if(ql) ql.textContent = leads.length;
  if(qa) qa.textContent = atendimentos.filter(a=>a.status==="Em aberto").length;
  if(qand) qand.textContent = atendimentos.filter(a=>a.status==="Em andamento").length;
  if(qf) qf.textContent = atendimentos.filter(a=>a.status==="Finalizado").length;
}

// Auto-login se houver sessão
window.addEventListener("DOMContentLoaded", ()=>{
  preencherEstadosECidades();
  if(usuarioLogado){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("plataforma").style.display="block";
    document.getElementById("nomeUsuario").textContent = usuarioLogado.nome;
    document.getElementById("papelUsuario").textContent = usuarioLogado.papel;
    document.getElementById("bemVindo").textContent = usuarioLogado.nome;
    if(usuarioLogado.foto){
      const fu = document.getElementById("fotoUsuario");
      if(fu) fu.src = usuarioLogado.foto;
    }
    if(typeof renderCorretores==="function") renderCorretores();
    if(typeof renderLeads==="function") renderLeads();
    atualizarCounters();
  }
});
