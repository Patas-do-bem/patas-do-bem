/* ----SEÇÃO: INÍCIO (CONFIGURAÇÕES GLOBAIS)---- */
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navMobile = document.getElementById('navMobile');

    if (navToggle && navMobile) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
        });
    }

    const reveals = document.querySelectorAll('.reveal, .fade-up');

    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;

        reveals.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) el.classList.add('visible');
        });
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    initMap();

    // Carrega os cães na página de cães
    if (document.getElementById('page-caes')) {
        carregarCaes();
    }

    // Carrega os cães na página de adoção
    if (document.getElementById('page-adocao')) {
        carregarCaesAdocao();
    }
});


function adicionarComentarioModal(event, formElement) {
    event.preventDefault();
    if (!usuarioLogado) {
        alert('⚠️ Ei! Você precisa estar logado para deixar um comentário.');
        return;
    }
    const input = document.getElementById('input-modal-comentario');
    const textoComentario = input.value.trim();
    if (!textoComentario) return;
    const modal = document.getElementById('post-modal');
    const postId = modal.getAttribute('data-active-post-id');
    const postOriginal = document.querySelector(`.feed-item[data-post-id="${postId}"]`);
    if (postOriginal) {
        const commentsListOriginal = postOriginal.querySelector('.comments-list');
        const novoComentarioHtml = `
            <div class="comment-item">
                <strong>Você:</strong> <span>${textoComentario}</span>
            </div>
        `;
        if(commentsListOriginal) commentsListOriginal.insertAdjacentHTML('beforeend', novoComentarioHtml);
        const modalCommentsList = document.getElementById('modal-comments-list');
        if(modalCommentsList.querySelector('.no-comments-msg')) modalCommentsList.innerHTML = '';
        modalCommentsList.insertAdjacentHTML('beforeend', novoComentarioHtml);
        const commentCountSpan = postOriginal.querySelector('.comment-count-text');
        if(commentCountSpan && commentsListOriginal) {
            let qtdComments = commentsListOriginal.children.length;
            commentCountSpan.innerText = `${qtdComments} comentário${qtdComments !== 1 ? 's' : ''}`;
        }
    }
    input.value = '';
}
function abrirPost(elemento) {
    const postCard = elemento.closest('.feed-item');
    const imgSrc = postCard.querySelector('.feed-media-wrapper img').src;
    const userHeaderHtml = postCard.querySelector('.feed-user-info').innerHTML;
    const postText = postCard.querySelector('.feed-text').innerText;
    const commentsListHtml = postCard.querySelector('.comments-list').innerHTML;
    const postId = postCard.getAttribute('data-post-id');
    const modal = document.getElementById('post-modal');
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal-user-header').innerHTML = userHeaderHtml;
    document.getElementById('modal-text-body').innerText = postText;
    const modalCommentsList = document.getElementById('modal-comments-list');
    modalCommentsList.innerHTML = commentsListHtml.trim() !== "" ? commentsListHtml : '<p class="no-comments-msg" style="font-size:0.85rem; color:#777; font-style:italic;">Nenhum comentário ainda. Seja o primeiro!</p>';
    modal.setAttribute('data-active-post-id', postId);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function toggleComments(btn) {
    abrirPost(btn);
    if (usuarioLogado) {
        setTimeout(() => {
            const inputModal = document.getElementById('input-modal-comentario');
            if(inputModal) inputModal.focus();
        }, 300);
    }
}
function fecharPost() {
    document.getElementById('post-modal').classList.remove('active');
    document.body.style.overflow = '';
}
function fecharModalExterno(event) {
    if (event.target.id === 'post-modal') fecharPost();
}

/* CÃES */
function filterDogs(button, status) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const dogCards = document.querySelectorAll('.dog-card');
    dogCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        if (status === 'todos' || cardStatus === status) {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            card.style.opacity = '0';
            card.style.display = 'none';
        }
    });
}


/* ADOÇÃO*/
function interestAlert(dogName) {
    alert(`Obrigado pelo interesse no(a) ${dogName}! Entre em contato conosco através da aba 'Contato' ou compareça à Sala 12 do Bloco B para iniciarmos o processo de entrevista e adoção responsável.`);
}

/*  DOAÇÕES */
function switchDonationTab(button, tabId) {
    const tabButtons = document.querySelectorAll('.donation-tabs-nav .tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const tabContents = document.querySelectorAll('.donation-tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    const targetTab = document.getElementById(`tab-${tabId}`);
    if (targetTab) targetTab.classList.add('active');
}
function copyPixKey(button) {
    const copyText = document.getElementById("pixKey");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-check"></i> Copiado!`;
    button.classList.add('copied');
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copied');
    }, 2500);
}

/* OCORRÊNCIAS */
function submitOcc(event) {
    event.preventDefault();
    const btnSubmit = document.getElementById('btnSubmitOcc');
    const nome = document.getElementById('occNome').value.trim() || 'Anônimo';
    const localValue = document.getElementById('occLocal').value;
    const tipoValue = document.getElementById('occTipo').value;
    const desc = document.getElementById('occDesc').value.trim();
    if (!localValue || !tipoValue || !desc) {
        alert('Por favor, preencha todos os campos obrigatórios (*).');
        return;
    }
    const locaisTraduzidos = {
        'bloco_a': 'Bloco A — Administração',
        'bloco_b': 'Bloco B — Ensino',
        'bloco_c': 'Bloco C — Laboratórios',
        'refeitorio': 'Refeitório / Área de Convivência',
        'estacionamento': 'Estacionamento Principal',
        'externo': 'Outro / Área Externa'
    };
    const tiposTraduzidos = {
        'animal_ferido': 'Animal Ferido ou Doente',
        'animal_abandonado': 'Animal Abandonado no Campus',
        'falta_recurso': 'Falta de Ração/Água nos pontos',
        'outros': 'Outra Situação'
    };
    const fakeId = '#' + Math.floor(100 + Math.random() * 900);
    const occList = document.getElementById('occList');
    if (occList) {
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span>Enviando...</span> <i class="ph ph-circle-notch" style="animation: spin 1s linear infinite;"></i>`;
        const timelineRow = document.createElement('div');
        timelineRow.className = 'timeline-row';
        timelineRow.innerHTML = `
            <div class="timeline-badge status-open"></div>
            <div class="occ-item status-border-open">
                <div class="occ-item-header">
                    <span class="occ-item-id">${fakeId}</span>
                    <span class="status-badge status-open">Aguardando Resgate</span>
                </div>
                <h4 class="occ-item-title">${tiposTraduzidos[tipoValue]}</h4>
                <div class="occ-item-meta">
                    <span><i class="ph ph-map-pin"></i> ${locaisTraduzidos[localValue]}</span>
                    <span><i class="ph ph-clock"></i> Agora mesmo (Relator: ${nome})</span>
                </div>
                <p class="occ-item-text">${desc}</p>
            </div>
        `;
        setTimeout(() => {
            occList.insertBefore(timelineRow, occList.firstChild);
            const countAbertasEl = document.getElementById('count-abertas');
            if (countAbertasEl) {
                let numAtual = parseInt(countAbertasEl.innerText, 10);
                numAtual++;
                countAbertasEl.innerText = numAtual < 10 ? '0' + numAtual : numAtual;
            }
            document.getElementById('occForm').reset();
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<span>Enviar ocorrência</span> <i class="ph ph-paper-plane-right"></i>`;
            alert('Ocorrência registrada com sucesso! Nossa equipe foi notificada e o painel atualizado.');
        }, 800);
    }
}

/*  CONTAT */
document.getElementById('form-contato')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const dadosFormulario = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: dadosFormulario
    })
    .then(response => {
        if (response.ok) {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            this.reset();
        } else {
            alert('Ocorreu um erro ao enviar sua mensagem. Tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro na integração:', error);
        alert('Erro de conexão com o servidor.');
    });
});

/*  MAPA INTERATIVO  */
function criarIconeCustomizado(classeIcone, corFundo) {
    return L.divIcon({
        html: `<div style="background-color: ${corFundo}; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 3px 8px rgba(0,0,0,0.3); border: 2px solid #ffffff;">
                <i class="${classeIcone}" style="font-size: 1.3rem;"></i>
               </div>`,
        className: 'custom-leaflet-icon',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -19]
    });
}
function initMap() {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    const centroCampus = [-19.018800, -49.477500];
    const map = L.map('map', { center: centroCampus, zoom: 18, zoomControl: true });
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
    const pontosInteresse = [
        { coords: [-19.017529, -49.477563], titulo: "<b>Sede Fauna</b>", descricao: "<i>Ponto Físico Temporário.</i> Local de apoio da equipe de monitoramento.", icone: "ph ph-paw-print", cor: "#2eb872" },
        { coords: [-19.018638, -49.478598], titulo: "<b>Ponto de Alimentação - Lanchonete</b>", descricao: "Dispensador de ração e água fresca com alta circulação de cães.", icone: "ph ph-bowl-food", cor: "#f47c2c" },
        { coords: [-19.018771, -49.477260], titulo: "<b>Ponto de Alimentação</b>", descricao: "Ponto de ração e água perto da copa dos professores e servidores.", icone: "ph ph-bowl-food", cor: "#f47c2c" },
        { coords: [-19.018987, -49.477276], titulo: "<b>Canil do IFTM</b>", descricao: "Área destinada ao acolhimento e cuidados dos cães do IFTM.", icone: "ph ph-house-line", cor: "#2eb872"
}
    ];
    pontosInteresse.forEach(ponto => {
        L.marker(ponto.coords, { icon: criarIconeCustomizado(ponto.icone, ponto.cor) })
        .addTo(map)
        .bindPopup(`${ponto.titulo}<br>${ponto.descricao}`);
    });
}

/* ----SEÇÃO: PERFIL/CADASTRO---- */
const admins = [
    {
        email: "admin@iftm.edu.br",
        senha: "admin123"
    }
];

/*CADASTRO*/

const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        const regex = /^[a-z]+\.[a-z]+@estudante\.iftm\.edu\.br$/i;

        if (!regex.test(email)) {

            alert(
                "Utilize um email institucional no formato:\n\nnome.sobrenome@estudante.iftm.edu.br"
            );

            return;
        }

        if (senha.length < 6) {

            alert("A senha deve possuir pelo menos 6 caracteres.");

            return;
        }

        if (senha !== confirmarSenha) {

            alert("As senhas não coincidem.");

            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];const response = await fetch(
  `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${email}`,
  {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  }
);

const data = await response.json();

if (data.length > 0) {
    alert("Este email já está cadastrado.");
    return;
}

        const usuarioExistente = usuarios.find(
            usuario => usuario.email === email
        );

        if (usuarioExistente) {

            alert("Este email já está cadastrado.");

            return;
        }

        await cadastrarUsuario({
    nome,
    email,
    senha,
    telefone: "",
    cidade: "",
    estado: ""
});

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Conta criada com sucesso!");

        window.location.href = "login.html";

    });

}

/*LOGIN*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;

        const admin = admins.find(
            adm => adm.email === email && adm.senha === senha
        );

        if (admin) {

            localStorage.setItem(
                "usuarioLogado",
                JSON.stringify({
                    nome: "Administrador",
                    email: admin.email,
                    tipo: "admin"
                })
            );

            window.location.href = "admin.html";

            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const usuario = usuarios.find(
            usuario =>
                usuario.email === email &&
                usuario.senha === senha
        );

        if (!usuario) {

            alert("Email ou senha inválidos.");

            return;
        }

        localStorage.setItem(
            "usuarioLogado",
            JSON.stringify({
                nome: usuario.nome,
                email: usuario.email,
                tipo: "usuario"
            })
        );

        window.location.href = "perfil.html";

    });

}



/*EXIBIR DADOS NO PERFIL*/

const dadosUsuarioLogado = JSON.parse(
    localStorage.getItem("usuarioLogado")
);

if (dadosUsuarioLogado) {

    const nomePerfil = document.getElementById("nomePerfil");
    const emailPerfil = document.getElementById("emailPerfil");

    if (nomePerfil) {
        nomePerfil.textContent = dadosUsuarioLogado.nome;
    }

    if (emailPerfil) {
        emailPerfil.textContent = dadosUsuarioLogado.email;
    }

}

/*LOGOUT */

const btnSair = document.querySelector(".btn-sair");

if (btnSair) {

    btnSair.addEventListener("click", () => {

        localStorage.removeItem("usuarioLogado");

        window.location.href = "login.html";

    });

}

/*INFOS*/ 
/* PERFIL USUÁRIO */

const tabelaUsuario =
document.getElementById("tabelaOcorrenciasUsuario");

if(tabelaUsuario){

    const ocorrencias =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];

    document.getElementById("totalOcorrencias").textContent =
    ocorrencias.length;

    document.getElementById("totalPosts").textContent =
    (JSON.parse(localStorage.getItem("posts")) || []).length;

    document.getElementById("totalComentarios").textContent =
    (JSON.parse(localStorage.getItem("comentarios")) || []).length;

    tabelaUsuario.innerHTML = "";

    ocorrencias.forEach((ocorrencia,index)=>{

        tabelaUsuario.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${ocorrencia.tipo}</td>
                <td>
                    <span class="status status-analise">
                        ${ocorrencia.status}
                    </span>
                </td>
            </tr>
        `;
    });

}

/*ADMIN*/
const tabelaAdmin =
document.getElementById("tabelaOcorrenciasAdmin");

if(tabelaAdmin){

    const ocorrencias =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];

    document.getElementById("totalOcorrenciasAbertas").textContent =
    ocorrencias.filter(
        o => o.status !== "Resolvida"
    ).length;

    tabelaAdmin.innerHTML = "";

    ocorrencias.forEach((ocorrencia,index)=>{

        tabelaAdmin.innerHTML += `
            <tr>
                <td>#${index + 1}</td>
                <td>${ocorrencia.tipo}</td>

                <td>

                    <select class="admin-select">

                        <option ${ocorrencia.status === "Aberta" ? "selected" : ""}>
                            Aberta
                        </option>

                        <option ${ocorrencia.status === "Em análise" ? "selected" : ""}>
                            Em análise
                        </option>

                        <option ${ocorrencia.status === "Resolvida" ? "selected" : ""}>
                            Resolvida
                        </option>

                    </select>

                </td>

                <td>
                    <button class="btn-admin">
                        Salvar
                    </button>
                </td>
            </tr>
        `;
    });

}

/*USUÁRIO*/
const tabelaUsuarios =
document.getElementById("tabelaUsuarios");

if(tabelaUsuarios){

    const usuarios =
    JSON.parse(localStorage.getItem("usuarios")) || [];

    document.getElementById("totalUsuarios").textContent =
    usuarios.length;

    tabelaUsuarios.innerHTML = "";

    usuarios.forEach(usuario=>{

        tabelaUsuarios.innerHTML += `
            <tr>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>Usuário</td>
            </tr>
        `;
    });

}

/* CONTROLE DE LOGIN NO MENU */

const usuarioSessao = JSON.parse(
    localStorage.getItem("usuarioLogado")
);

const btnCadastro =
document.getElementById("btnCadastro");

const btnLogin =
document.getElementById("btnLogin");

if(usuarioSessao){

    if(btnCadastro){
        btnCadastro.style.display = "none";
    }

    if(btnLogin){
        btnLogin.style.display = "none";
    }

}

/* BOTÃO PERFIL / ADMIN */

const btnPerfil = document.getElementById("btnPerfil");

if (btnPerfil) {

    const usuario = JSON.parse(
        localStorage.getItem("usuarioLogado")
    );

    if (usuario) {

        if (usuario.tipo === "admin") {

            btnPerfil.href = "admin.html";

            btnPerfil.innerHTML = `
                <i class="ph ph-shield-check"></i>
                Painel Admin
            `;

        } else {

            btnPerfil.href = "perfil.html";

            btnPerfil.innerHTML = `
                <i class="ph ph-user-circle"></i>
                Meu Perfil
            `;
        }

    } else {

        btnPerfil.href = "cadastro.html";

        btnPerfil.innerHTML = `
            <i class="ph ph-user-plus"></i>
            Criar Perfil
        `;
    }

}

