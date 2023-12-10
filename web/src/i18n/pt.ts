import ptMessages from 'ra-language-pt-br';

export const mensagens = {
    simple: {
        action: {
            close: 'Fechar',
            resetViews: 'Resetar visualizações',
        },
        'create-post': 'Nova postagem',
    },
    ...ptMessages,
    resources: {
        posts: {
            name: 'Postagem |||| Postagens',
            fields: {
                commentable_short: 'Coment.',
                commentable: 'Comentável',
                notifications: 'Destinatários de notificações',
                nb_view: 'Nb visualizações',
                nb_comments: 'Nb comentários',
                password: 'Senha (se a postagem for protegida)',
                pictures: 'Imagens relacionadas',
                title: 'Título'
            },
        },
        comments: {
            name: 'Comentário |||| Comentários',
            fields: {
                post_id: 'Postagem',
            },
        },
        users: {
            name: 'Usuário |||| Usuários',
            fields: {
                name: 'Nome',
                role: 'Permissão',
            },
        },
        pulseiras: {
            name: 'Pulseira |||| Pulseiras',
            fields: {
                userId: 'Usuário',
                deviceId: 'Código da Pulseira',
            },
        },
    },
    post: {
        list: {
            search: 'Buscar',
        },
        form: {
            summary: 'Resumo',
            body: 'Corpo',
            miscellaneous: 'Diversos',
            comments: 'Comentários',
        },
        edit: {
            title: 'Postagem "%{title}"',
        },
        action: {
            save_and_edit: 'Salvar e Editar',
            save_and_add: 'Salvar e Adicionar',
            save_and_show: 'Salvar e Mostrar',
            save_with_average_note: 'Salvar com Nota Média',
        },
    },
    comment: {
        list: {
            about: 'Sobre',
        },
    },
    user: {
        list: {
            search: 'Buscar',
        },
        form: {
            summary: 'Resumo',
            security: 'Segurança',
        },
        action: {
            save_and_add: 'Salvar e Adicionar',
            save_and_show: 'Salvar e Mostrar',
        },
    },
};

export default mensagens;
