

// =========================================================
// --- PARTE 1: CADASTRO DE CÃES ---
// =========================================================

async function handleCadastroCao(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const arquivo = document.getElementById('foto-cao').files[0];
    
    if (!arquivo) return alert("Selecione uma foto!");
    
    btn.disabled = true;
    btn.innerText = "Cadastrando...";

    try {
        const urlImagem = await uploadArquivo(arquivo, 'fotos-caes');
        const dados = {
    nome: document.getElementById('nome-cao').value,
    raca: document.getElementById('raca-cao').value,
    idade: document.getElementById('idade-cao').value,
    porte: document.getElementById('porte-cao').value,
    sexo: document.getElementById('sexo-cao').value,
    descricao: document.getElementById('desc-cao').value,
    imagem_url: urlImagem,
    castrado: document.getElementById('castrado-cao')?.checked || false,
    vacinado: document.getElementById('vacinado-cao')?.checked || false,
    status_adocao: document.getElementById('status-cao').value
};

       
        await cadastrarCao(dados);
        alert("Cão cadastrado com sucesso!");
        e.target.reset();
    } catch (error) {
        console.error("Erro no cadastro:", error);
        alert("Erro: " + error.message);
    } finally {
        btn.disabled = false;
        btn.innerText = "Concluir Cadastro";
    }
}

// --- FUNÇÃO ÚNICA PARA CARREGAR CÃES ---
async function carregarCaes() {
    const grid = document.getElementById('dogsGrid');
    if (!grid) return;

    try {
        const data = await buscarCaes();

        if (!data || data.length === 0) {
            grid.innerHTML = '<p>Nenhum cão cadastrado no momento.</p>';
            return;
        }

        grid.innerHTML = data.map(c => `
            <div class="dog-card" data-status="${c.sexo?.toLowerCase() || ''}">
                <div class="dog-img">
                    <img src="${c.imagem_url}" alt="${c.nome}" loading="lazy"/>
                </div>

                <div class="dog-body">
                    <div class="dog-header">
                        <h3>${c.nome}</h3>
                        <span class="status-badge">${c.status_adocao || 'Disponível'}</span>
                    </div>

                    <div class="dog-meta">
                        <span>🐾 ${c.sexo || 'N/A'}</span>
                        <span>📅 ${c.idade || '0'} anos</span>
                        <span>${c.castrado ? '🏥 Castrado' : ''}</span>
                        <span>${c.vacinado ? '💉 Vacinado' : ''}</span>
                    </div>

                    <p>${c.descricao || 'Sem descrição'}</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error("Erro ao carregar cães:", error);
        grid.innerHTML = '<p>Erro ao carregar cães.</p>';
    }
}

async function carregarCaesAdocao() {
    const grid = document.getElementById('dogsGrid');
    if (!grid) return;

    try {
        const data = await buscarCaes();

        const disponiveis = data.filter(
    c => c.status_adocao === 'adocao'
);

        if (disponiveis.length === 0) {
            grid.innerHTML = '<p>Nenhum cão disponível para adoção.</p>';
            return;
        }

        grid.innerHTML = disponiveis.map(c => `
            <div class="adopt-card">
                <div class="adopt-img">
                    <img src="${c.imagem_url}" alt="${c.nome}" loading="lazy"/>
                    <span class="adopt-ribbon">Disponível</span>
                </div>

                <div class="adopt-body">
                    <h3 class="adopt-name">${c.nome}</h3>

                    <div class="adopt-info">
                        <span>🐾 ${c.idade || '0'} anos · ${c.sexo || 'N/A'}</span>
                        <span>
                            ${c.vacinado ? '✅ Vacinado' : ''}
                            ${c.castrado ? ' · ✅ Castrado' : ''}
                        </span>
                    </div>

                    <button
                        class="btn btn-orange"
                        style="width:100%"
                        onclick="interestAlert('${c.nome}')">
                        Tenho Interesse
                    </button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error(error);
        grid.innerHTML = '<p>Erro ao carregar cães para adoção.</p>';
    }
}


// =========================================================
// --- PARTE 2: INSTACÃO ---
// =========================================================

async function handlePostInstacao(e) {
    console.log("HANDLE", Date.now());

    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    
    if (!usuario) return alert('Você precisa estar logado!');
    if (!usuario.email.endsWith("@estudante.iftm.edu.br")) return alert("Acesso negado: Apenas e-mails do IFTM.");

    const arquivo = document.getElementById('post-image').files[0];
    const legenda = document.getElementById('post-comment').value.trim();

    if (!arquivo || !legenda) return alert("Selecione uma imagem e escreva uma legenda!");

    if (btn) { btn.disabled = true; btn.innerText = "Postando..."; }

    try {
        const urlFoto = await uploadArquivo(arquivo, 'instacao'); 
        await salvarPostNoBanco({
            legenda: legenda,
            imagem_url: urlFoto,
            autor_nome: usuario.nome,
            autor_email: usuario.email
        });

        alert("Postado com sucesso!");
        e.target.reset();
        
        const container = document.getElementById('upload-preview-container');
        if (container) container.classList.add('preview-hidden');

        await renderizarFeed(); 
    } catch (error) {
        console.error("Erro na postagem:", error);
        alert("Erro ao postar: " + error.message);
    } finally {
        if (btn) { btn.disabled = false; btn.innerText = "Publicar"; }
    }
}

async function renderizarFeed() {
    const feed = document.getElementById('feed-instacao');
    if (!feed) return;

    const posts = await carregarPostsInstacao();

    console.log(posts); 

    feed.innerHTML = posts.map(post => `
        <article class="feed-item">
            <div class="feed-media-wrapper clickable-media"
                 onclick="abrirPostInstacao(
                    '${post.imagem_url}',
                    '${(post.legenda || '').replace(/'/g, "\\'")}',
                    '${(post.autor_nome || 'Anônimo').replace(/'/g, "\\'")}'
                 )">

                <img src="${post.imagem_url}" alt="Post do InstaCão">

                <div class="media-overlay">
                    <i class="ph ph-magnifying-glass-plus"></i>
                    Ampliar
                </div>
            </div>

            <div class="feed-content">
                <div class="feed-user-info">
                    <span class="user-avatar">🐶</span>

                    <div>
                        <h4 class="user-name">${post.autor_nome || 'Anônimo'}</h4>
                        <span class="user-email">${post.autor_email || ''}</span>
                    </div>
                </div>

                <p class="feed-text">${post.legenda || ''}</p>
            </div>
        </article>
    `).join('');
}
function abrirPostInstacao(imagem, legenda, autor) {

    const modal = document.getElementById('post-modal');

    document.getElementById('modal-img').src = imagem;

    document.getElementById('modal-user-header').innerHTML = `
        <span class="user-avatar">🐶</span>
        <div>
            <h4 class="user-name">${autor}</h4>
        </div>
    `;

    document.getElementById('modal-text-body').innerHTML = `
        <p>${legenda}</p>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function fecharPost() {
    document.getElementById('post-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function fecharModalExterno(event) {
    if (event.target.id === 'post-modal') {
        fecharPost();
    }
}
// =========================================================
// --- PARTE 3: INICIALIZAÇÃO ---
// =========================================================

function mostrarPreviewImagem(input) {
    const container = document.getElementById('upload-preview-container');
    const preview = document.getElementById('img-preview');
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            if (container) container.classList.remove('preview-hidden');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const formCao = document.getElementById('form-cadastro-cao');
    if (formCao) formCao.addEventListener('submit', handleCadastroCao);

    const formPost = document.getElementById('form-novo-post');
    if (formPost) formPost.addEventListener('submit', handlePostInstacao);

    renderizarFeed();
});

async function loginUsuario(email, senha) {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/usuarios?email=eq.${email}&senha=eq.${senha}`,
        {
            headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    const data = await response.json();

    if (!data || data.length === 0) {
        throw new Error("Email ou senha inválidos");
    }

    return data[0];
}