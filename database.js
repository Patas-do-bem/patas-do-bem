/* =========================================================
   DATABASE.JS - PATAS DO BEM (COMPLETO E CORRIGIDO)
   Gerencia conexões com o Supabase usando lógica de Fetch
========================================================= */
const SUPABASE_URL = "https://mnxdxadptxymjsfptbhl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ueGR4YWRwdHh5bWpzZnB0YmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MjAxMDMsImV4cCI6MjA5NjA5NjEwM30.pXTRVG-HVujHG4fRbyDpM6G23oq0-nC-P2rrnsLA07o";

// --- FUNÇÃO GENÉRICA DE UPLOAD (Adicionada para resolver o problema de imagem) ---
async function uploadArquivo(arquivo, bucket) {
    const nomeArquivo = `${Date.now()}_${arquivo.name}`;
    const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${nomeArquivo}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'apikey': SUPABASE_KEY,
            'Content-Type': arquivo.type
        },
        body: arquivo
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || "Erro no upload da imagem");
    }
    
    // Retorna a URL pública da imagem
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${nomeArquivo}`;
}

// --- MÓDULO ADOÇÃO (Animais) ---

async function cadastrarCao(dados) {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/animais`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                nome: dados.nome,
                raca: dados.raca,
                idade: dados.idade,
                porte: dados.porte,
                sexo: dados.sexo,
                descricao: dados.descricao,
                imagem_url: dados.imagem_url,
                castrado: Boolean(dados.castrado),
                vacinado: Boolean(dados.vacinado),
                status_adocao: dados.status_adocao
            })
        });

        if (response.status === 201 || response.status === 200) {
            return { sucesso: true }; 
        } else {
            const erroDetalhado = await response.json();
            throw new Error(erroDetalhado.message || "Erro ao salvar no banco");
        }
    } catch (error) {
        throw error;
    }
}

async function buscarCaes() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/animais?select=*`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error("Erro ao buscar dados do banco.");
        return await response.json();
    } catch (error) {
        return [];
    }
}

// --- MÓDULO INSTACÃO (Posts) ---

async function carregarPostsInstacao() {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/posts_instacao?select=*&order=data_criacao.desc`, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error("Erro ao carregar os posts.");
        return await response.json();
    } catch (error) {
        return [];
    }
}

async function salvarPostNoBanco(dados) {
   console.count("SALVAR POST");
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/posts_instacao`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                legenda: dados.legenda,
                imagem_url: dados.imagem_url,
                autor_nome: dados.autor_nome,
                autor_email: dados.autor_email
            })
        });

        if (response.status === 201 || response.status === 200) {
            return { sucesso: true }; 
        } else {
            const erroDetalhado = await response.json();
            throw new Error(erroDetalhado.message || "Erro ao salvar post");
        }
    } catch (error) {
        throw error;
    }
}

async function cadastrarUsuario(dados) {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/usuarios`, {
        method: "POST",
        headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json",
            Prefer: "return=representation"
        },
        body: JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            telefone: dados.telefone || null,
            cidade: dados.cidade || null,
            estado: dados.estado || null,
            nivel_acesso: "usuario",
            data_cadastro: new Date().toISOString()
        })
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.message || "Erro ao cadastrar usuário");
    }

    return await response.json();
}

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